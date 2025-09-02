import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');
    const userId = url.searchParams.get('userId');

    switch (action) {
      case 'dashboard-stats': {
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'User ID required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Get enrolled courses count
        const { count: enrolledCourses } = await supabase
          .from('course_enrollments')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);

        // Get completed courses count
        const { count: completedCourses } = await supabase
          .from('course_enrollments')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('completed', true);

        // Get total test attempts
        const { count: testAttempts } = await supabase
          .from('test_attempts')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId);

        // Get average test score
        const { data: avgScoreData } = await supabase
          .from('test_attempts')
          .select('score')
          .eq('user_id', userId)
          .eq('completed', true);

        const averageScore = avgScoreData && avgScoreData.length > 0
          ? avgScoreData.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / avgScoreData.length
          : 0;

        // Get recent test attempts
        const { data: recentTests } = await supabase
          .from('test_attempts')
          .select(`
            *,
            tests (
              title,
              test_series (
                title,
                subject
              )
            )
          `)
          .eq('user_id', userId)
          .eq('completed', true)
          .order('completed_at', { ascending: false })
          .limit(5);

        // Get course progress
        const { data: courseProgress } = await supabase
          .from('course_enrollments')
          .select(`
            progress,
            courses (
              title,
              duration_weeks
            )
          `)
          .eq('user_id', userId)
          .order('enrolled_at', { ascending: false });

        const stats = {
          enrolledCourses: enrolledCourses || 0,
          completedCourses: completedCourses || 0,
          testAttempts: testAttempts || 0,
          averageScore: Math.round(averageScore * 100) / 100,
          recentTests: recentTests || [],
          courseProgress: courseProgress || []
        };

        return new Response(JSON.stringify(stats), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'performance-analytics': {
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'User ID required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Get test performance over time
        const { data: testPerformance } = await supabase
          .from('test_attempts')
          .select(`
            score,
            completed_at,
            tests (
              title,
              test_series (
                subject
              )
            )
          `)
          .eq('user_id', userId)
          .eq('completed', true)
          .order('completed_at', { ascending: true });

        // Get subject-wise performance
        const subjectPerformance = {};
        if (testPerformance) {
          testPerformance.forEach(attempt => {
            const subject = attempt.tests?.test_series?.subject || 'Unknown';
            if (!subjectPerformance[subject]) {
              subjectPerformance[subject] = {
                totalTests: 0,
                totalScore: 0,
                averageScore: 0
              };
            }
            subjectPerformance[subject].totalTests += 1;
            subjectPerformance[subject].totalScore += attempt.score || 0;
          });

          Object.keys(subjectPerformance).forEach(subject => {
            const data = subjectPerformance[subject];
            data.averageScore = data.totalScore / data.totalTests;
          });
        }

        // Get learning streak
        const { data: recentActivity } = await supabase
          .from('test_attempts')
          .select('completed_at')
          .eq('user_id', userId)
          .eq('completed', true)
          .order('completed_at', { ascending: false })
          .limit(30);

        let currentStreak = 0;
        if (recentActivity && recentActivity.length > 0) {
          const today = new Date();
          const dates = recentActivity.map(activity => 
            new Date(activity.completed_at).toDateString()
          );
          
          // Calculate consecutive days
          for (let i = 0; i < 30; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - i);
            if (dates.includes(checkDate.toDateString())) {
              currentStreak = i + 1;
            } else {
              break;
            }
          }
        }

        return new Response(JSON.stringify({
          testPerformance: testPerformance || [],
          subjectPerformance,
          learningStreak: currentStreak
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'global-stats': {
        // Get total users count
        const { count: totalUsers } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Get total courses count
        const { count: totalCourses } = await supabase
          .from('courses')
          .select('*', { count: 'exact', head: true })
          .eq('is_published', true);

        // Get total test series count
        const { count: totalTestSeries } = await supabase
          .from('test_series')
          .select('*', { count: 'exact', head: true })
          .eq('is_published', true);

        // Get total enrollments
        const { count: totalEnrollments } = await supabase
          .from('course_enrollments')
          .select('*', { count: 'exact', head: true });

        return new Response(JSON.stringify({
          totalUsers: totalUsers || 0,
          totalCourses: totalCourses || 0,
          totalTestSeries: totalTestSeries || 0,
          totalEnrollments: totalEnrollments || 0
        }), {
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
    console.error('Error in analytics function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);