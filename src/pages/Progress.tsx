import { ArrowLeft, TrendingUp, Award, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const ProgressTracker = () => {
  const [progressData, setProgressData] = useState<any>(null);
  const [loadingTask, setLoadingTask] = useState(false);

  // Fetch progress from backend
  const loadProgress = () => {
    fetch("https://greengrow-backend-9lb9.onrender.com/progress")")
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend data:", data);
        setProgressData(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadProgress();
  }, []);

  // Task list
  const tasks = [
    { id: "apply_compost", name: "Apply Compost" },
    { id: "add_neem", name: "Add Neem Cake" },
    { id: "water_crops", name: "Water Crops" },
    { id: "remove_weeds", name: "Remove Weeds" },
    { id: "monitor_pests", name: "Monitor Pests" },
  ];

  // Handle task completion
  const completeTask = async (taskId: string) => {
    setLoadingTask(true);

    try {
      const res = await fetch("https://greengrow-backend-9lb9.onrender.com/complete_task")", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: taskId }),
      });

      const data = await res.json();
      console.log("Updated:", data);

      loadProgress();
    } catch (e) {
      alert("Backend not reachable!");
    }

    setLoadingTask(false);
  };

  if (!progressData) return <p className="p-6">Loading...</p>;

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

        {/* Display backend progress numbers */}
        <Card className="p-4 border-0 shadow-card bg-success/10">
          <p className="text-sm">Growth: <b>{progressData.growth}%</b></p>
          <p className="text-sm">Soil Health: <b>{progressData.soil_health}%</b></p>
          <p className="text-sm">Tasks Completed: <b>{progressData.tasks_completed}</b></p>
        </Card>

        {/* REAL TASK LIST */}
        <Card className="p-6 border-0 shadow-card bg-white">
          <h3 className="font-bold text-lg text-foreground mb-4">📝 Tasks</h3>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-3 bg-muted rounded-xl"
              >
                <span className="font-medium">{task.name}</span>
                <button
                  disabled={loadingTask}
                  onClick={() => completeTask(task.id)}
                  className="px-3 py-1 rounded-lg bg-success text-white flex items-center gap-1"
                >
                  <CheckCircle className="h-4 w-4" />
                  Done
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 border-0 shadow-card bg-success/10">
            <div className="flex items-center gap-2 mb-1">
              <Award className="h-5 w-5 text-success" />
              <span className="text-sm">Points</span>
            </div>
            <p className="text-3xl font-bold">{progressData.tasks_completed * 100}</p>
          </Card>

          <Card className="p-4 border-0 shadow-card bg-primary/10">
            <div className="flex items-center gap-2 mb-1">
              <Target className="h-5 w-5 text-primary" />
              <span className="text-sm">Growth</span>
            </div>
            <p className="text-3xl font-bold">{progressData.growth}%</p>
          </Card>
        </div>

        {/* Soil Health */}
        <Card className="p-6 border-0 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-success" />
            <h3 className="font-bold text-lg text-foreground">Soil Health Progress</h3>
          </div>

          <p className="text-sm mb-2">Organic Matter</p>
          <Progress value={progressData.soil_health} className="h-2" />

          <p className="text-xs text-muted-foreground mt-2">
            Your soil health improves as you complete tasks!
          </p>
        </Card>

      </div>
    </div>
  );
};

export default ProgressTracker;
