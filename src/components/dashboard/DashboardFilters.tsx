
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DashboardFiltersProps {
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  selectedMonths: string[];
  setSelectedMonths: (months: string[]) => void;
  selectedQuarters: string[];
  setSelectedQuarters: (quarters: string[]) => void;
  startMonth: string;
  setStartMonth: (month: string) => void;
  endMonth: string;
  setEndMonth: (month: string) => void;
}

const DashboardFilters = ({
  selectedPeriod,
  setSelectedPeriod,
  selectedMonths,
  setSelectedMonths,
  selectedQuarters,
  setSelectedQuarters,
  startMonth,
  setStartMonth,
  endMonth,
  setEndMonth
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
    { value: "2024-06", label: "Jun 2024" },
    { value: "2024-07", label: "Jul 2024" },
    { value: "2024-08", label: "Aug 2024" },
    { value: "2024-09", label: "Sep 2024" },
    { value: "2024-10", label: "Oct 2024" },
    { value: "2024-11", label: "Nov 2024" },
    { value: "2024-12", label: "Dec 2024" }
  ];

  const quarters = [
    { value: "Q1", label: "Quarter 1 (Jan-Mar)" },
    { value: "Q2", label: "Quarter 2 (Apr-Jun)" },
    { value: "Q3", label: "Quarter 3 (Jul-Sep)" },
    { value: "Q4", label: "Quarter 4 (Oct-Dec)" }
  ];

  const toggleMonth = (month: string) => {
    if (selectedMonths.includes(month)) {
      setSelectedMonths(selectedMonths.filter(m => m !== month));
    } else {
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  const toggleQuarter = (quarter: string) => {
    if (selectedQuarters.includes(quarter)) {
      setSelectedQuarters(selectedQuarters.filter(q => q !== quarter));
    } else {
      setSelectedQuarters([...selectedQuarters, quarter]);
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

          {/* Monthly Selection */}
          {selectedPeriod === "monthly" && (
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
          )}

          {/* Quarterly Selection */}
          {selectedPeriod === "quarterly" && (
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">
                <Calendar className="w-4 h-4 inline mr-1" />
                Select Quarters ({selectedQuarters.length} selected)
              </label>
              <div className="flex flex-wrap gap-2">
                {quarters.map((quarter) => (
                  <Badge
                    key={quarter.value}
                    variant={selectedQuarters.includes(quarter.value) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      selectedQuarters.includes(quarter.value) 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "hover:bg-muted"
                    }`}
                    onClick={() => toggleQuarter(quarter.value)}
                  >
                    {quarter.label}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Cumulative Selection */}
          {selectedPeriod === "cumulative" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Start Month
                </label>
                <Select value={startMonth} onValueChange={setStartMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select start month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  End Month
                </label>
                <Select value={endMonth} onValueChange={setEndMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select end month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardFilters;
