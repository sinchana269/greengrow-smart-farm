import { Sprout, Leaf, Calculator, BookOpen, ShoppingBag, Users, TrendingUp, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const farmer = {
    name: user?.user_metadata?.name || "Farmer",
    points: 1250,
    rank: 42,
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          navigate("/auth");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      navigate("/auth");
    }
  };

  const quickActions = [
    { title: "Soil Health", icon: Leaf, path: "/soil-health", color: "bg-primary" },
    { title: "Calculator", icon: Calculator, path: "/calculator", color: "bg-secondary" },
    { title: "Learning Hub", icon: BookOpen, path: "/learning", color: "bg-primary-light" },
    { title: "Marketplace", icon: ShoppingBag, path: "/marketplace", color: "bg-accent" },
    { title: "Community", icon: Users, path: "/community", color: "bg-primary" },
    { title: "Progress", icon: TrendingUp, path: "/progress", color: "bg-success" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-8 rounded-b-[2rem] shadow-card">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Sprout className="h-8 w-8" />
            <h1 className="text-2xl font-bold">GreenGrow</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleLogout}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
        <p className="text-primary-foreground/90 text-lg">Welcome back, {farmer.name}!</p>
        <div className="mt-4 flex gap-4">
          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-xs text-primary-foreground/80">Green Points</p>
            <p className="text-xl font-bold">{farmer.points}</p>
          </div>
          <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-xl px-4 py-2">
            <p className="text-xs text-primary-foreground/80">Rank</p>
            <p className="text-xl font-bold">#{farmer.rank}</p>
          </div>
        </div>
      </div>

      {/* Quote of the Day */}
      <Card className="mx-6 -mt-6 mb-6 p-4 bg-card shadow-card border-0">
        <p className="text-sm text-muted-foreground italic">
          "The soil is the great connector of lives, the source and destination of all." - Wendell Berry
        </p>
      </Card>

      {/* Quick Actions Grid */}
      <div className="px-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link key={action.path} to={action.path}>
              <Card className="p-6 flex flex-col items-center gap-3 hover:shadow-card transition-all duration-300 hover:scale-105 border-0 bg-gradient-to-br from-card to-muted/30">
                <div className={`${action.color} p-4 rounded-2xl text-white`}>
                  <action.icon className="h-8 w-8" />
                </div>
                <span className="text-sm font-medium text-center text-card-foreground">{action.title}</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Weather Widget */}
      <Card className="mx-6 mt-6 p-4 bg-gradient-to-r from-primary-light/10 to-primary/10 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Today's Weather</p>
            <p className="text-2xl font-bold text-foreground">28°C</p>
            <p className="text-xs text-muted-foreground">Partly Cloudy</p>
          </div>
          <div className="text-5xl">☀️</div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
