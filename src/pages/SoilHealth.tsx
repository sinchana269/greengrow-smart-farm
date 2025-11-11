import { useState } from "react";
import { ArrowLeft, Upload, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SoilHealth = () => {
  const [analyzed, setAnalyzed] = useState(false);

  const handleAnalyze = () => {
    setAnalyzed(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-6 pt-12 pb-6 rounded-b-[2rem] shadow-card">
        <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/90 mb-4">
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold">Soil Health Assessment</h1>
        <p className="text-primary-foreground/80 mt-1">Check your soil's nutrient status</p>
      </div>

      <div className="px-6 mt-6 space-y-4">
        {!analyzed ? (
          <>
            {/* Input Form */}
            <Card className="p-6 space-y-4 border-0 shadow-card">
              <div className="space-y-2">
                <Label>Soil Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay</SelectItem>
                    <SelectItem value="loam">Loam</SelectItem>
                    <SelectItem value="sandy">Sandy</SelectItem>
                    <SelectItem value="silt">Silt</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Crop Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Land Size (acres)</Label>
                <Input type="number" placeholder="Enter land size" />
              </div>

              <div className="space-y-2">
                <Label>pH Level</Label>
                <Input type="number" step="0.1" placeholder="6.5" />
              </div>
            </Card>

            {/* Upload Card */}
            <Card className="p-6 border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
              <div className="flex flex-col items-center gap-3 text-center">
                <Upload className="h-12 w-12 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Upload Soil Test Report</p>
                  <p className="text-sm text-muted-foreground">PDF or Image format</p>
                </div>
              </div>
            </Card>

            <Button onClick={handleAnalyze} className="w-full h-12 text-lg rounded-xl">
              Analyze Soil
            </Button>
          </>
        ) : (
          <>
            {/* Results */}
            <Card className="p-6 border-0 shadow-card bg-gradient-to-br from-card to-warning/5 border-l-4 border-warning">
              <div className="flex items-start gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-warning shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg text-foreground">Nutrient Analysis</h3>
                  <p className="text-sm text-muted-foreground">Based on your soil data</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <span className="font-medium">Nitrogen (N)</span>
                  <span className="text-destructive font-bold">Low ⚠️</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <span className="font-medium">Phosphorus (P)</span>
                  <span className="text-success font-bold">Good ✓</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-background rounded-lg">
                  <span className="font-medium">Potassium (K)</span>
                  <span className="text-warning font-bold">Medium</span>
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6 border-0 shadow-card bg-gradient-to-br from-success/10 to-primary/5">
              <h3 className="font-bold text-lg text-foreground mb-4">🌱 Organic Recommendations</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-background rounded-xl">
                  <p className="font-semibold text-primary mb-2">Compost</p>
                  <p className="text-sm text-muted-foreground">Apply 200 kg per acre before sowing</p>
                </div>
                
                <div className="p-4 bg-background rounded-xl">
                  <p className="font-semibold text-primary mb-2">Neem Cake</p>
                  <p className="text-sm text-muted-foreground">Apply 10 kg per acre at planting time</p>
                </div>
                
                <div className="p-4 bg-background rounded-xl">
                  <p className="font-semibold text-primary mb-2">Rhizobium Bio-fertilizer</p>
                  <p className="text-sm text-muted-foreground">Mix 250g with seeds before sowing</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-accent/20 rounded-xl border border-accent/30">
                <p className="text-sm font-medium text-foreground">
                  💡 Following these recommendations can improve nitrogen levels by 30-40% in 3 months
                </p>
              </div>
            </Card>

            <Button onClick={() => setAnalyzed(false)} variant="outline" className="w-full h-12 text-lg rounded-xl">
              New Assessment
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SoilHealth;
