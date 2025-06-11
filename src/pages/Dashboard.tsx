
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Activity, 
  Heart, 
  LogOut, 
  Calendar,
  Users,
  Building2
} from "lucide-react";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import MetricsCard from "@/components/dashboard/MetricsCard";
import DepartmentHealth from "@/components/dashboard/DepartmentHealth";
import FourDXChart from "@/components/dashboard/FourDXChart";

interface User {
  username: string;
  role: string;
  departments: string[];
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedMonths, setSelectedMonths] = useState<string[]>(["2024-06"]);
  const navigate = useNavigate();

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

  if (!user) {
    return <div>Loading...</div>;
  }

  // Mock data - in real app, this would come from SharePoint
  const mockMetrics = {
    wig: { value: 85, target: 90, trend: 5 },
    lag: { value: 78, target: 80, trend: -2 },
    lead: { value: 92, target: 85, trend: 8 },
    activity: { value: 156, target: 150, trend: 12 }
  };

  const departmentHealth = Math.round((mockMetrics.lag.value / mockMetrics.lag.target) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <img 
                  src="/lovable-uploads/5e72745e-18ec-46d6-8375-e9912bdb8bdd.png" 
                  alt="Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">4DX Executive Dashboard</h1>
                <p className="text-sm text-muted-foreground">Life Makers Egypt</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
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
        {/* Filters */}
        <DashboardFilters
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
          selectedMonths={selectedMonths}
          setSelectedMonths={setSelectedMonths}
        />

        {/* 4DX Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricsCard
            title="WIG (Wildly Important Goal)"
            value={mockMetrics.wig.value}
            target={mockMetrics.wig.target}
            trend={mockMetrics.wig.trend}
            icon={Target}
            color="wig"
            unit="%"
          />
          <MetricsCard
            title="LAG Measures"
            value={mockMetrics.lag.value}
            target={mockMetrics.lag.target}
            trend={mockMetrics.lag.trend}
            icon={BarChart3}
            color="lag"
            unit="%"
          />
          <MetricsCard
            title="LEAD Measures"
            value={mockMetrics.lead.value}
            target={mockMetrics.lead.target}
            trend={mockMetrics.lead.trend}
            icon={TrendingUp}
            color="lead"
            unit="%"
          />
          <MetricsCard
            title="Activity Score"
            value={mockMetrics.activity.value}
            target={mockMetrics.activity.target}
            trend={mockMetrics.activity.trend}
            icon={Activity}
            color="activity"
            unit=""
          />
        </div>

        {/* Charts and Health */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FourDXChart user={user} selectedMonths={selectedMonths} />
          </div>
          <div>
            <DepartmentHealth 
              department={user.role === "CEO" ? "Organization" : user.departments[0]}
              healthPercentage={departmentHealth}
            />
          </div>
        </div>

        {/* Additional Insights for CEO */}
        {user.role === "CEO" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {["HR", "Finance", "Operations", "Marketing"].map((dept) => (
                  <div key={dept} className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">{dept}</h4>
                    <div className="text-2xl font-bold text-foreground">{Math.floor(Math.random() * 20) + 75}%</div>
                    <p className="text-xs text-muted-foreground">Department Health</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
