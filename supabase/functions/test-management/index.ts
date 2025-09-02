import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface TestAttemptRequest {
  testId: string;
  userId: string;
  score?: number;
  correctAnswers?: number;
  timeTakenMinutes?: number;
  completed?: boolean;
}

interface TestResultsRequest {
  userId: string;
  testSeriesId?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    switch (action) {
      case 'start-test': {
        const { testId, userId }: TestAttemptRequest = await req.json();
        
        // Get test details
        const { data: test, error: testError } = await supabase
          .from('tests')
          .select('*')
          .eq('id', testId)
          .single();

        if (testError) throw testError;

        // Create test attempt
        const { data, error } = await supabase
          .from('test_attempts')
          .insert({
            test_id: testId,
            user_id: userId,
            started_at: new Date().toISOString(),
            total_questions: test.total_questions,
            completed: false,
            score: null,
            correct_answers: 0
          })
          .select()
          .single();

        if (error) throw error;

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'submit-test': {
        const { testId, userId, score, correctAnswers, timeTakenMinutes }: TestAttemptRequest = await req.json();
        
        const { data, error } = await supabase
          .from('test_attempts')
          .update({
            score,
            correct_answers: correctAnswers,
            time_taken_minutes: timeTakenMinutes,
            completed: true,
            completed_at: new Date().toISOString()
          })
          .eq('test_id', testId)
          .eq('user_id', userId)
          .eq('completed', false)
          .select()
          .single();

        if (error) throw error;

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'get-test-attempts': {
        const userId = url.searchParams.get('userId');
        const testId = url.searchParams.get('testId');
        
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'User ID required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        let query = supabase
          .from('test_attempts')
          .select(`
            *,
            tests (
              id,
              title,
              description,
              duration_minutes,
              passing_score,
              test_series (
                id,
                title,
                subject
              )
            )
          `)
          .eq('user_id', userId);

        if (testId) {
          query = query.eq('test_id', testId);
        }

        const { data, error } = await query.order('started_at', { ascending: false });

        if (error) throw error;

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'get-test-results': {
        const { userId, testSeriesId }: TestResultsRequest = await req.json();
        
        let query = supabase
          .from('test_attempts')
          .select(`
            *,
            tests!inner (
              id,
              title,
              test_series_id,
              passing_score,
              test_series (
                id,
                title,
                subject
              )
            )
          `)
          .eq('user_id', userId)
          .eq('completed', true);

        if (testSeriesId) {
          query = query.eq('tests.test_series_id', testSeriesId);
        }

        const { data, error } = await query.order('completed_at', { ascending: false });

        if (error) throw error;

        // Calculate statistics
        const stats = {
          totalAttempts: data.length,
          averageScore: data.length > 0 ? data.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / data.length : 0,
          passedTests: data.filter(attempt => (attempt.score || 0) >= (attempt.tests.passing_score || 60)).length,
          totalTimeSpent: data.reduce((sum, attempt) => sum + (attempt.time_taken_minutes || 0), 0)
        };

        return new Response(JSON.stringify({ attempts: data, stats }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'get-leaderboard': {
        const testSeriesId = url.searchParams.get('testSeriesId');
        
        let query = supabase
          .from('test_attempts')
          .select(`
            user_id,
            score,
            time_taken_minutes,
            completed_at,
            profiles!inner (
              full_name
            ),
            tests!inner (
              title,
              test_series_id
            )
          `)
          .eq('completed', true);

        if (testSeriesId) {
          query = query.eq('tests.test_series_id', testSeriesId);
        }

        const { data, error } = await query.order('score', { ascending: false }).limit(50);

        if (error) throw error;

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (error: any) {
    console.error('Error in test-management function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);