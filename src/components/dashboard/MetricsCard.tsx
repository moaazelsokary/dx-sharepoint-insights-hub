
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: number;
  target: number;
  trend: number;
  icon: LucideIcon;
  color: "wig" | "lag" | "lead" | "activity";
  unit: string;
}

const MetricsCard = ({ title, value, target, trend, icon: Icon, color, unit }: MetricsCardProps) => {
  const colorClasses = {
    wig: "text-wig border-wig/20 bg-wig/5",
    lag: "text-lag border-lag/20 bg-lag/5",
    lead: "text-lead border-lead/20 bg-lead/5",
    activity: "text-activity border-activity/20 bg-activity/5"
  };

  const isPositiveTrend = trend > 0;
  const achievementRate = (value / target) * 100;

  return (
    <Card className={`border-2 ${colorClasses[color]} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-sm font-medium">
          <span className="text-muted-foreground">{title}</span>
          <Icon className={`w-5 h-5 ${color === 'wig' ? 'text-wig' : color === 'lag' ? 'text-lag' : color === 'lead' ? 'text-lead' : 'text-activity'}`} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-foreground">
              {value}{unit}
            </span>
            <span className="text-sm text-muted-foreground">
              / {target}{unit}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant={isPositiveTrend ? "default" : "destructive"} 
              className="text-xs px-2 py-0.5"
            >
              {isPositiveTrend ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {Math.abs(trend)}{unit}
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
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                color === 'wig' ? 'bg-wig' : 
                color === 'lag' ? 'bg-lag' : 
                color === 'lead' ? 'bg-lead' : 
                'bg-activity'
              }`}
              style={{ width: `${Math.min(achievementRate, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
