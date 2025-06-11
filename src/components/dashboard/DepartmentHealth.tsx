
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Activity } from "lucide-react";

interface DepartmentHealthProps {
  department: string;
  healthPercentage: number;
}

const DepartmentHealth = ({ department, healthPercentage }: DepartmentHealthProps) => {
  const getHealthColor = (percentage: number) => {
    if (percentage >= 80) return "text-health-good";
    if (percentage >= 60) return "text-health-warning";
    return "text-health-critical";
  };

  const getHealthStatus = (percentage: number) => {
    if (percentage >= 80) return "Excellent";
    if (percentage >= 60) return "Good";
    if (percentage >= 40) return "Fair";
    return "Needs Attention";
  };

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="w-5 h-5 text-primary" />
          {department} Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Heart Animation */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Heart 
              className={`w-16 h-16 health-heart ${getHealthColor(healthPercentage)} fill-current`}
            />
            {/* Blood flow animation */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className={`w-1 h-8 health-blood ${getHealthColor(healthPercentage)} bg-current rounded-full opacity-70`} />
            </div>
          </div>
          
          <div className="text-center space-y-2">
            <div className={`text-4xl font-bold ${getHealthColor(healthPercentage)}`}>
              {healthPercentage}%
            </div>
            <div className="text-sm text-muted-foreground">
              Health Score
            </div>
            <div className={`text-lg font-semibold ${getHealthColor(healthPercentage)}`}>
              {getHealthStatus(healthPercentage)}
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="space-y-3">
          <div className="text-sm font-medium text-muted-foreground">Health Indicators</div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">LAG Performance</span>
              <span className="text-sm font-medium">{healthPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  healthPercentage >= 80 ? 'bg-health-good' :
                  healthPercentage >= 60 ? 'bg-health-warning' :
                  'bg-health-critical'
                }`}
                style={{ width: `${healthPercentage}%` }}
              />
            </div>
          </div>

          <div className="text-xs text-muted-foreground mt-4 p-3 bg-muted/50 rounded-lg">
            <strong>Health Calculation:</strong> Based on average LAG measures performance. 
            Higher scores indicate better alignment with 4DX methodology and achievement of Wildly Important Goals.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentHealth;
