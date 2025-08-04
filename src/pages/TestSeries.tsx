import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Clock, Trophy, Users, Calendar } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"

interface TestSeries {
  id: string;
  title: string;
  subject: string;
  description: string;
  total_tests: number;
  difficulty: string;
  duration_minutes: number;
}

export default function TestSeries() {
  const [testSeries, setTestSeries] = useState<TestSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestSeries();
  }, []);

  const fetchTestSeries = async () => {
    try {
      const { data, error } = await supabase
        .from('test_series')
        .select('*')
        .eq('is_published', true);

      if (error) throw error;
      setTestSeries(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load test series",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };


  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Test Series</h1>
          <p className="text-muted-foreground">
            Practice with comprehensive test series to master your subjects
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Browse All Series
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="card-soft p-6">
              <div className="space-y-3">
                <div className="h-6 bg-muted rounded animate-pulse" />
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {testSeries.map((series) => (
            <Card key={series.id} className="card-soft p-6 hover:shadow-card transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{series.title}</h3>
                  <p className="text-sm text-muted-foreground">{series.subject}</p>
                </div>
                <Badge className={getDifficultyColor(series.difficulty)}>
                  {series.difficulty}
                </Badge>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Tests</span>
                  <span className="font-medium">{series.total_tests} tests</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {series.duration_minutes} mins
                  </div>
                  <div className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {series.difficulty}
                  </div>
                </div>
              </div>

              <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Description:</p>
                <p className="text-sm">{series.description}</p>
              </div>

              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Start Series
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}