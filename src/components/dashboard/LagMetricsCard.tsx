
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Target } from "lucide-react";

interface LagMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  trend: number;
  leads: {
    id: string;
    name: string;
    value: number;
    target: number;
    trend: number;
  }[];
}

interface LagMetricsCardProps {
  lag: LagMetric;
  onClick: (lagId: string) => void;
}

const LagMetricsCard = ({ lag, onClick }: LagMetricsCardProps) => {
  const achievementRate = (lag.value / lag.target) * 100;
  const isOverTarget = achievementRate > 100;
  const isPositiveTrend = lag.trend > 0;

  return (
    <Card 
      className="border-2 border-lag/20 bg-lag/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
      onClick={() => onClick(lag.id)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span className="text-muted-foreground">{lag.name}</span>
          <Target className="w-5 h-5 text-lag" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">
              {lag.value}/{lag.target}
            </span>
            <span className="text-sm text-muted-foreground">
              ({Math.round(achievementRate)}%)
            </span>
            {isOverTarget && (
              <Badge variant="default" className="bg-green-500 text-white text-xs">
                Over Target
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant={isPositiveTrend ? "default" : "destructive"} 
              className="text-xs px-2 py-0.5"
            >
              {isPositiveTrend ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {Math.abs(lag.trend)}%
            </Badge>
            <span className="text-xs text-muted-foreground">vs last period</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{Math.round(achievementRate)}%</span>
          </div>
          <Progress 
            value={Math.min(achievementRate, 100)} 
            className="h-2"
          />
        </div>

        <div className="text-xs text-muted-foreground">
          Click to view {lag.leads.length} related leads
        </div>
      </CardContent>
    </Card>
  );
};

export default LagMetricsCard;
