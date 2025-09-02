import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.53.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface CourseEnrollmentRequest {
  courseId: string;
  userId: string;
}

interface CourseProgressRequest {
  courseId: string;
  userId: string;
  progress: number;
  completed?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action');

    switch (action) {
      case 'enroll': {
        const { courseId, userId }: CourseEnrollmentRequest = await req.json();
        
        // Check if already enrolled
        const { data: existingEnrollment } = await supabase
          .from('course_enrollments')
          .select('id')
          .eq('course_id', courseId)
          .eq('user_id', userId)
          .single();

        if (existingEnrollment) {
          return new Response(
            JSON.stringify({ error: 'Already enrolled in this course' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { data, error } = await supabase
          .from('course_enrollments')
          .insert({
            course_id: courseId,
            user_id: userId,
            enrolled_at: new Date().toISOString(),
            progress: 0,
            completed: false
          })
          .select()
          .single();

        if (error) throw error;

        // Update course total students count
        const { error: updateError } = await supabase.rpc('increment_course_students', {
          course_id: courseId
        });

        if (updateError) console.error('Error updating course student count:', updateError);

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'update-progress': {
        const { courseId, userId, progress, completed }: CourseProgressRequest = await req.json();
        
        const updateData: any = {
          progress,
          updated_at: new Date().toISOString()
        };

        if (completed !== undefined) {
          updateData.completed = completed;
          if (completed) {
            updateData.completed_at = new Date().toISOString();
          }
        }

        const { data, error } = await supabase
          .from('course_enrollments')
          .update(updateData)
          .eq('course_id', courseId)
          .eq('user_id', userId)
          .select()
          .single();

        if (error) throw error;

        return new Response(JSON.stringify(data), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      case 'get-enrollments': {
        const userId = url.searchParams.get('userId');
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'User ID required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { data, error } = await supabase
          .from('course_enrollments')
          .select(`
            *,
            courses (
              id,
              title,
              description,
              instructor_name,
              thumbnail_url,
              duration_weeks
            )
          `)
          .eq('user_id', userId);

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
    console.error('Error in course-management function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
};

serve(handler);