import { ArrowLeft, TrendingUp, Award, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ProgressTracker = () => {
  const achievements = [
    { title: "First Assessment", icon: "🎯", unlocked: true },
    { title: "Organic Beginner", icon: "🌱", unlocked: true },
    { title: "Community Helper", icon: "🤝", unlocked: true },
    { title: "Green Champion", icon: "🏆", unlocked: false },
    { title: "Soil Expert", icon: "🔬", unlocked: false },
    { title: "Master Farmer", icon: "👨‍🌾", unlocked: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <div className="bg-success text-white px-6 pt-12 pb-6 rounded-b-[2rem] shadow-card">
        <Link to="/" className="inline-flex items-center gap-2 text-white/90 mb-4">
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold">Progress Tracker</h1>
        <p className="text-white/80 mt-1">Your organic farming journey</p>
      </div>

      <div className="px-6 mt-6 space-y-4">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 border-0 shadow-card bg-gradient-to-br from-accent/20 to-accent/5">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">Green Points</span>
            </div>
            <p className="text-3xl font-bold text-foreground">1,250</p>
            <p className="text-xs text-muted-foreground mt-1">+150 this week</p>
          </Card>

          <Card className="p-4 border-0 shadow-card bg-gradient-to-br from-primary/20 to-primary/5">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">Rank</span>
            </div>
            <p className="text-3xl font-bold text-foreground">#42</p>
            <p className="text-xs text-muted-foreground mt-1">In your region</p>
          </Card>
        </div>

        {/* Soil Health Improvement */}
        <Card className="p-6 border-0 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-success" />
            <h3 className="font-bold text-lg text-foreground">Soil Health Progress</h3>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Nitrogen Level</span>
                <span className="text-sm font-semibold text-success">+25%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Organic Matter</span>
                <span className="text-sm font-semibold text-success">+18%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">pH Balance</span>
                <span className="text-sm font-semibold text-success">Optimal</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </div>

          <div className="mt-4 p-4 bg-success/10 rounded-xl border border-success/20">
            <p className="text-sm font-medium text-foreground">
              🌟 Your soil health improved by 32% in 3 months using organic methods!
            </p>
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 border-0 shadow-card">
          <h3 className="font-bold text-lg text-foreground mb-4">🏆 Achievements</h3>
          <div className="grid grid-cols-3 gap-3">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl text-center transition-all ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/30"
                    : "bg-muted/50 opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <p className="text-xs font-medium text-foreground">{achievement.title}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Environmental Impact */}
        <Card className="p-6 border-0 shadow-card bg-gradient-to-br from-primary/5 to-success/5">
          <h3 className="font-bold text-lg text-foreground mb-4">🌍 Environmental Impact</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-background rounded-xl">
              <span className="text-sm text-muted-foreground">Chemical Reduction</span>
              <span className="text-lg font-bold text-success">85%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-xl">
              <span className="text-sm text-muted-foreground">Carbon Saved</span>
              <span className="text-lg font-bold text-primary">420 kg</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-xl">
              <span className="text-sm text-muted-foreground">Water Conservation</span>
              <span className="text-lg font-bold text-primary-light">2,100 L</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProgressTracker;
