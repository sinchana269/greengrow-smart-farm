import { ArrowLeft, Play, FileText, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Learning = () => {
  const videos = [
    { title: "Making Compost at Home", duration: "8:45", views: "12k", thumbnail: "🌿" },
    { title: "Neem Cake Benefits", duration: "6:20", views: "8.5k", thumbnail: "🍃" },
    { title: "Bio-fertilizer Application", duration: "10:15", views: "15k", thumbnail: "🧪" },
  ];

  const guides = [
    { title: "Complete Organic Farming Guide", pages: "24 pages", icon: "📖" },
    { title: "Pest Control Without Chemicals", pages: "16 pages", icon: "🐛" },
    { title: "Water Management Tips", pages: "12 pages", icon: "💧" },
  ];

  const stories = [
    { name: "Suresh Patil", location: "Karnataka", achievement: "Doubled yield in 1 year", image: "👨‍🌾" },
    { name: "Lakshmi Devi", location: "Tamil Nadu", achievement: "100% organic transition", image: "👩‍🌾" },
    { name: "Ravi Kumar", location: "Punjab", achievement: "Won State Award", image: "👨‍🌾" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <div className="bg-primary-light text-white px-6 pt-12 pb-6 rounded-b-[2rem] shadow-card">
        <Link to="/" className="inline-flex items-center gap-2 text-white/90 mb-4">
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold">Learning Hub</h1>
        <p className="text-white/80 mt-1">Expand your organic farming knowledge</p>
      </div>

      <div className="px-6 mt-6">
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-4">
            {videos.map((video, index) => (
              <Card key={index} className="p-4 border-0 shadow-card hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="shrink-0 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary-light/20 rounded-xl flex items-center justify-center text-4xl relative">
                    {video.thumbnail}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
                      <Play className="h-8 w-8 text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{video.title}</h3>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{video.duration}</span>
                      <span>👁️ {video.views}</span>
                    </div>
                    <div className="mt-2 flex gap-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">Hindi</span>
                      <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full">Kannada</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="guides" className="space-y-4">
            {guides.map((guide, index) => (
              <Card key={index} className="p-4 border-0 shadow-card hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-16 h-16 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl flex items-center justify-center text-3xl">
                    {guide.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground">{guide.pages}</p>
                  </div>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="stories" className="space-y-4">
            {stories.map((story, index) => (
              <Card key={index} className="p-4 border-0 shadow-card bg-gradient-to-br from-card to-success/5">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-16 h-16 bg-gradient-to-br from-accent/30 to-accent/10 rounded-full flex items-center justify-center text-3xl">
                    {story.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{story.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{story.location}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <Trophy className="h-4 w-4 text-accent" />
                      <span className="text-accent font-medium">{story.achievement}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learning;
