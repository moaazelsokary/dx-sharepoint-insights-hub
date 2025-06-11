
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Filter } from "lucide-react";

interface DashboardFiltersProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  selectedMonths: string[];
  setSelectedMonths: (months: string[]) => void;
}

const DashboardFilters = ({
  selectedPeriod,
  setSelectedPeriod,
  selectedMonths,
  setSelectedMonths
}: DashboardFiltersProps) => {
  const periods = [
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "cumulative", label: "Cumulative" }
  ];

  const months = [
    { value: "2024-01", label: "Jan 2024" },
    { value: "2024-02", label: "Feb 2024" },
    { value: "2024-03", label: "Mar 2024" },
    { value: "2024-04", label: "Apr 2024" },
    { value: "2024-05", label: "May 2024" },
    { value: "2024-06", label: "Jun 2024" }
  ];

  const toggleMonth = (month: string) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter(m => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-primary" />
          <h3 className="font-semibold">Time Period Filters</h3>
        </div>
        
        <div className="space-y-4">
          {/* Period Selection */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Analysis Period
            </label>
            <div className="flex flex-wrap gap-2">
              {periods.map((period) => (
                <Button
                  key={period.value}
                  variant={selectedPeriod === period.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period.value)}
                  className={selectedPeriod === period.value ? "bg-primary text-primary-foreground" : ""}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Month Selection */}
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              <Calendar className="w-4 h-4 inline mr-1" />
              Select Months ({selectedMonths.length} selected)
            </label>
            <div className="flex flex-wrap gap-2">
              {months.map((month) => (
                <Badge
                  key={month.value}
                  variant={selectedMonths.includes(month.value) ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedMonths.includes(month.value) 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "hover:bg-muted"
                  }`}
                  onClick={() => toggleMonth(month.value)}
                >
                  {month.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardFilters;
