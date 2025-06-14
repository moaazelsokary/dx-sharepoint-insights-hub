
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LogOut, 
  Calendar,
  Users,
  Building2,
  BarChart3,
  RefreshCw,
  Database
} from "lucide-react";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import LagMetricsCard from "@/components/dashboard/LagMetricsCard";
import LeadMeasuresModal from "@/components/dashboard/LeadMeasuresModal";
import DepartmentHealth from "@/components/dashboard/DepartmentHealth";
import SharePointAuth from "@/components/sharepoint/SharePointAuth";
import { useSharePointData } from "@/hooks/useSharePointData";
import { toast } from "@/hooks/use-toast";

interface User {
  username: string;
  role: string;
  departments: string[];
}

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

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedMonths, setSelectedMonths] = useState<string[]>(["2025-06"]);
  const [selectedQuarters, setSelectedQuarters] = useState<string[]>(["Q2"]);
  const [startMonth, setStartMonth] = useState("2025-01");
  const [endMonth, setEndMonth] = useState("2025-06");
  const [selectedLag, setSelectedLag] = useState<LagMetric | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isSharePointAuthenticated, setIsSharePointAuthenticated] = useState(false);
  const navigate = useNavigate();

  // SharePoint data hook
  const sharePointData = useSharePointData(isSharePointAuthenticated);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleLagClick = (lagId: string) => {
    const lag = currentLagMetrics.find(l => l.id === lagId);
    if (lag) {
      setSelectedLag(lag);
      setIsLeadModalOpen(true);
    }
  };

  const handleSharePointAuthChange = (isAuthenticated: boolean) => {
    setIsSharePointAuthenticated(isAuthenticated);
    if (isAuthenticated) {
      toast({
        title: "SharePoint Connected",
        description: "Now displaying live data from SharePoint",
      });
    }
  };

  const handleRefreshData = () => {
    if (isSharePointAuthenticated) {
      sharePointData.refetch();
      toast({
        title: "Data Refreshed",
        description: "Latest data fetched from SharePoint",
      });
    }
  };

  // Generate different mock data based on selected time period (fallback when SharePoint not connected)
  const generateMockData = () => {
    let baseMultiplier = 1;
    let periodCount = 1;

    if (selectedPeriod === "monthly") {
      periodCount = selectedMonths.length;
      baseMultiplier = 0.8 + (periodCount * 0.1);
    } else if (selectedPeriod === "quarterly") {
      periodCount = selectedQuarters.length;
      baseMultiplier = 0.7 + (periodCount * 0.15);
    } else if (selectedPeriod === "cumulative") {
      const startIndex = parseInt(startMonth.split('-')[1]);
      const endIndex = parseInt(endMonth.split('-')[1]);
      periodCount = Math.max(1, endIndex - startIndex + 1);
      baseMultiplier = 0.6 + (periodCount * 0.08);
    }

    return [
      {
        id: "lag1",
        name: "Customer Satisfaction Score",
        value: Math.round(75 * baseMultiplier),
        target: 85,
        trend: Math.round((Math.random() - 0.5) * 10),
        leads: [
          {
            id: "lead1",
            name: "Response Time",
            value: Math.round(88 * baseMultiplier),
            target: 90,
            trend: Math.round((Math.random() - 0.5) * 8)
          },
          {
            id: "lead2", 
            name: "First Call Resolution",
            value: Math.round(82 * baseMultiplier),
            target: 85,
            trend: Math.round((Math.random() - 0.5) * 6)
          },
          {
            id: "lead3",
            name: "Agent Training Hours",
            value: Math.round(95 * baseMultiplier),
            target: 80,
            trend: Math.round((Math.random() - 0.5) * 4)
          }
        ]
      },
      {
        id: "lag2",
        name: "Revenue Growth",
        value: Math.round(68 * baseMultiplier),
        target: 75,
        trend: Math.round((Math.random() - 0.5) * 12),
        leads: [
          {
            id: "lead4",
            name: "Sales Calls Made",
            value: Math.round(92 * baseMultiplier),
            target: 85,
            trend: Math.round((Math.random() - 0.5) * 10)
          },
          {
            id: "lead5",
            name: "Lead Conversion Rate",
            value: Math.round(76 * baseMultiplier),
            target: 80,
            trend: Math.round((Math.random() - 0.5) * 8)
          }
        ]
      },
      {
        id: "lag3",
        name: "Employee Retention",
        value: Math.round(89 * baseMultiplier),
        target: 85,
        trend: Math.round((Math.random() - 0.5) * 5),
        leads: [
          {
            id: "lead6",
            name: "Manager Check-ins",
            value: Math.round(85 * baseMultiplier),
            target: 90,
            trend: Math.round((Math.random() - 0.5) * 7)
          },
          {
            id: "lead7",
            name: "Training Completion",
            value: Math.round(94 * baseMultiplier),
            target: 85,
            trend: Math.round((Math.random() - 0.5) * 3)
          },
          {
            id: "lead8",
            name: "Work-Life Balance Score",
            value: Math.round(78 * baseMultiplier),
            target: 80,
            trend: Math.round((Math.random() - 0.5) * 9)
          }
        ]
      },
      {
        id: "lag4",
        name: "Product Quality Score",
        value: Math.round(91 * baseMultiplier),
        target: 88,
        trend: Math.round((Math.random() - 0.5) * 6),
        leads: [
          {
            id: "lead9",
            name: "Quality Inspections",
            value: Math.round(96 * baseMultiplier),
            target: 90,
            trend: Math.round((Math.random() - 0.5) * 4)
          },
          {
            id: "lead10",
            name: "Defect Rate",
            value: Math.round(87 * baseMultiplier),
            target: 85,
            trend: Math.round((Math.random() - 0.5) * 8)
          }
        ]
      }
    ];
  };

  // Use SharePoint data if available, otherwise fall back to mock data
  const currentLagMetrics = isSharePointAuthenticated && sharePointData.lagMeasures.length > 0 
    ? sharePointData.lagMeasures 
    : generateMockData();

  if (!user) {
    return <div>Loading...</div>;
  }

  const departmentHealth = Math.round(currentLagMetrics.reduce((acc, lag) => acc + (lag.value / lag.target), 0) / currentLagMetrics.length * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 flex items-center justify-center p-2">
                <img 
                  src="/lovable-uploads/5e72745e-18ec-46d6-8375-e9912bdb8bdd.png" 
                  alt="Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">LAG Measures Dashboard</h1>
                <p className="text-sm text-muted-foreground">Life Makers Foundation - 4DX Methodology</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {isSharePointAuthenticated && (
                <Button variant="outline" size="sm" onClick={handleRefreshData}>
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Refresh Data
                </Button>
              )}
              <div className="flex items-center gap-2">
                {user.role === "CEO" ? (
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    <Users className="w-3 h-3 mr-1" />
                    CEO View
                  </Badge>
                ) : (
                  <Badge variant="outline" className="border-primary text-primary">
                    <Building2 className="w-3 h-3 mr-1" />
                    {user.departments[0]}
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground">Welcome, {user.username}</span>
              </div>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-1" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* SharePoint Integration */}
        <SharePointAuth onAuthChange={handleSharePointAuthChange} />

        {/* Data Source Indicator */}
        <Card className="border-l-4 border-l-primary">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                <span className="font-medium">Data Source:</span>
                <Badge variant={isSharePointAuthenticated ? "default" : "secondary"}>
                  {isSharePointAuthenticated ? "SharePoint Live Data" : "Demo Data"}
                </Badge>
              </div>
              {sharePointData.isLoading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Loading SharePoint data...
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <DashboardFilters
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
          selectedQuarters={selectedQuarters}
          setSelectedQuarters={setSelectedQuarters}
          startMonth={startMonth}
          setStartMonth={setStartMonth}
          endMonth={endMonth}
          setEndMonth={setEndMonth}
        />

        {/* LAG Metrics Grid */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-6 h-6 text-lag" />
            <h2 className="text-2xl font-bold text-foreground">LAG Measures</h2>
            <Badge variant="outline" className="border-lag text-lag">
              {currentLagMetrics.length} Active Measures
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {currentLagMetrics.map((lag) => (
              <LagMetricsCard
                key={lag.id}
                lag={lag}
                onClick={handleLagClick}
              />
            ))}
          </div>
        </div>

        {/* Department Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Period Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    {selectedPeriod === "monthly" && `Viewing ${selectedMonths.length} selected months`}
                    {selectedPeriod === "quarterly" && `Viewing ${selectedQuarters.length} selected quarters`}
                    {selectedPeriod === "cumulative" && `Cumulative data from ${startMonth} to ${endMonth}`}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {currentLagMetrics.map((lag) => {
                      const achievementRate = (lag.value / lag.target) * 100;
                      return (
                        <div key={lag.id} className="p-3 bg-muted/50 rounded-lg">
                          <h4 className="font-semibold text-xs text-muted-foreground mb-1">{lag.name}</h4>
                          <div className="text-lg font-bold text-foreground">{lag.value}/{lag.target} ({Math.round(achievementRate)}%)</div>
                          <p className="text-xs text-muted-foreground">Achievement Rate</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <DepartmentHealth 
              department={user.role === "CEO" ? "Organization" : user.departments[0]}
              healthPercentage={departmentHealth}
            />
          </div>
        </div>
      </div>

      {/* Lead Measures Modal */}
      <LeadMeasuresModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        lagName={selectedLag?.name || ""}
        leads={selectedLag?.leads || []}
      />
    </div>
  );
};

export default Dashboard;
