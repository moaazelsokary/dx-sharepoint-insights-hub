
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock authentication - in real app, this would connect to SharePoint/Supabase
  const mockUsers = {
    "CEO": { role: "CEO", departments: ["all"] },
    "hr": { role: "department", departments: ["HR"] },
    "finance": { role: "department", departments: ["Finance"] },
    "operations": { role: "department", departments: ["Operations"] },
    "marketing": { role: "department", departments: ["Marketing"] }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication delay
    setTimeout(() => {
      if (mockUsers[username as keyof typeof mockUsers] && password === "password123") {
        const user = mockUsers[username as keyof typeof mockUsers];
        
        // Store user info in localStorage (in real app, use proper session management)
        localStorage.setItem("user", JSON.stringify({
          username,
          role: user.role,
          departments: user.departments
        }));

        toast({
          title: "Sign in successful",
          description: `Welcome, ${username}!`,
        });

        navigate("/dashboard");
      } else {
        toast({
          title: "Sign in failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-24 h-24 flex items-center justify-center">
            <img 
              src="/lovable-uploads/5e72745e-18ec-46d6-8375-e9912bdb8bdd.png" 
              alt="Life Makers Egypt" 
              className="w-20 h-20 object-contain"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">4DX Dashboard</h1>
            <p className="text-muted-foreground">Life Makers Egypt - Executive Portal</p>
          </div>
        </div>

        {/* Sign In Card */}
        <Card className="border-0 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold flex items-center justify-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Sign In
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the 4DX insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
