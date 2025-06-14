
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, CloudOff, User } from "lucide-react";
import { sharePointService } from "@/services/sharePointService";
import { toast } from "@/hooks/use-toast";

interface SharePointAuthProps {
  onAuthChange: (isAuthenticated: boolean) => void;
}

const SharePointAuth = ({ onAuthChange }: SharePointAuthProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      await sharePointService.initialize();
      const authenticated = sharePointService.isSignedIn();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        setUserInfo(sharePointService.getUserInfo());
      }
      
      onAuthChange(authenticated);
    } catch (error) {
      console.error("Failed to initialize SharePoint auth:", error);
    }
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      const success = await sharePointService.signIn();
      if (success) {
        setIsAuthenticated(true);
        setUserInfo(sharePointService.getUserInfo());
        onAuthChange(true);
        toast({
          title: "SharePoint Connected",
          description: "Successfully connected to SharePoint",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Failed to connect to SharePoint",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "An error occurred while connecting to SharePoint",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await sharePointService.signOut();
      setIsAuthenticated(false);
      setUserInfo(null);
      onAuthChange(false);
      toast({
        title: "Disconnected",
        description: "Disconnected from SharePoint",
      });
    } catch (error) {
      toast({
        title: "Sign Out Error",
        description: "Failed to sign out of SharePoint",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isAuthenticated ? (
            <Cloud className="w-5 h-5 text-green-500" />
          ) : (
            <CloudOff className="w-5 h-5 text-muted-foreground" />
          )}
          SharePoint Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge 
              variant={isAuthenticated ? "default" : "secondary"}
              className={isAuthenticated ? "bg-green-500 text-white" : ""}
            >
              {isAuthenticated ? "Connected" : "Disconnected"}
            </Badge>
            {userInfo && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                {userInfo.name || userInfo.username}
              </div>
            )}
          </div>
          
          {isAuthenticated ? (
            <Button variant="outline" onClick={handleSignOut}>
              Disconnect
            </Button>
          ) : (
            <Button 
              onClick={handleSignIn} 
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? "Connecting..." : "Connect to SharePoint"}
            </Button>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          {isAuthenticated 
            ? "Real-time data sync enabled with SharePoint"
            : "Connect to SharePoint to sync live data from your Excel files"
          }
        </div>
      </CardContent>
    </Card>
  );
};

export default SharePointAuth;
