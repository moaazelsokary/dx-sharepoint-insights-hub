
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TrendingUp, TrendingDown } from "lucide-react";

interface LeadMeasure {
  id: string;
  name: string;
  value: number;
  target: number;
  trend: number;
}

interface LeadMeasuresModalProps {
  isOpen: boolean;
  onClose: () => void;
  lagName: string;
  leads: LeadMeasure[];
}

const LeadMeasuresModal = ({ isOpen, onClose, lagName, leads }: LeadMeasuresModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Lead Measures for: {lagName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {leads.map((lead) => {
            const achievementRate = (lead.value / lead.target) * 100;
            const isOverTarget = achievementRate > 100;
            const isPositiveTrend = lead.trend > 0;

            return (
              <Card key={lead.id} className="border-2 border-lead/20 bg-lead/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between text-sm font-medium">
                    <span className="text-muted-foreground">{lead.name}</span>
                    <TrendingUp className="w-5 h-5 text-lead" />
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">
                        {lead.value}/{lead.target}
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
                        {Math.abs(lead.trend)}%
                      </Badge>
                      <span className="text-xs text-muted-foreground">vs last period</span>
                    </div>
                  </div>

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
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadMeasuresModal;
