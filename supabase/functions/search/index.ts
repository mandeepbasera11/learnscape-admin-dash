import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    if (req.method !== 'GET') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(req.url);
    const query = url.searchParams.get('q');
    const type = url.searchParams.get('type') || 'all'; // all, courses, tests

    if (!query || query.trim().length === 0) {
      return new Response(JSON.stringify({ 
        courses: [], 
        testSeries: [],
        message: 'Please provide a search query' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const searchQuery = `%${query.trim()}%`;
    let courses = [];
    let testSeries = [];

    // Search courses if type is 'all' or 'courses'
    if (type === 'all' || type === 'courses') {
      const { data: courseData, error: courseError } = await supabaseClient
        .from('courses')
        .select(`
          id,
          title,
          description,
          instructor_name,
          price,
          rating,
          thumbnail_url,
          duration_weeks,
          total_students
        `)
        .eq('is_published', true)
        .or(`title.ilike.${searchQuery},description.ilike.${searchQuery},instructor_name.ilike.${searchQuery}`)
        .limit(10);

      if (courseError) {
        console.error('Error searching courses:', courseError);
      } else {
        courses = courseData || [];
      }
    }

    // Search test series if type is 'all' or 'tests'
    if (type === 'all' || type === 'tests') {
      const { data: testData, error: testError } = await supabaseClient
        .from('test_series')
        .select(`
          id,
          title,
          description,
          subject,
          total_tests,
          duration_minutes
        `)
        .eq('is_published', true)
        .or(`title.ilike.${searchQuery},description.ilike.${searchQuery},subject.ilike.${searchQuery}`)
        .limit(10);

      if (testError) {
        console.error('Error searching test series:', testError);
      } else {
        testSeries = testData || [];
      }
    }

    const totalResults = courses.length + testSeries.length;

    return new Response(JSON.stringify({ 
      query,
      courses,
      testSeries,
      totalResults,
      message: totalResults === 0 ? 'No results found' : `Found ${totalResults} results`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in search function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});