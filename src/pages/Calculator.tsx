import { useState } from "react";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

const Calculator = () => {
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    setCalculated(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted pb-20">
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground px-6 pt-12 pb-6 rounded-b-[2rem] shadow-card">
        <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/90 mb-4">
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold">Fertilizer Calculator</h1>
        <p className="text-secondary-foreground/80 mt-1">Calculate organic input needs</p>
      </div>

      <div className="px-6 mt-6 space-y-4">
        {!calculated ? (
          <>
            <Card className="p-6 space-y-4 border-0 shadow-card">
              <div className="space-y-2">
                <Label>Select Crop</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose your crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rice">Rice 🌾</SelectItem>
                    <SelectItem value="wheat">Wheat 🌾</SelectItem>
                    <SelectItem value="maize">Maize 🌽</SelectItem>
                    <SelectItem value="sugarcane">Sugarcane 🎋</SelectItem>
                    <SelectItem value="cotton">Cotton 🌸</SelectItem>
                    <SelectItem value="tomato">Tomato 🍅</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Land Area (acres)</Label>
                <Input type="number" placeholder="Enter area in acres" defaultValue="1" />
              </div>

              <div className="space-y-2">
                <Label>Growing Season</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kharif">Kharif (Monsoon)</SelectItem>
                    <SelectItem value="rabi">Rabi (Winter)</SelectItem>
                    <SelectItem value="zaid">Zaid (Summer)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            <Button onClick={handleCalculate} className="w-full h-12 text-lg rounded-xl bg-secondary hover:bg-secondary/90">
              Calculate Requirements
            </Button>
          </>
        ) : (
          <>
            {/* Results */}
            <Card className="p-6 border-0 shadow-card bg-gradient-to-br from-card to-primary/5">
              <h3 className="font-bold text-lg text-foreground mb-4">📊 Required Organic Inputs</h3>
              <p className="text-sm text-muted-foreground mb-4">For Rice - 1 acre - Kharif season</p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">Compost</span>
                    <span className="font-bold text-primary">200 kg</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">Neem Cake</span>
                    <span className="font-bold text-primary">10 kg</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">Bio-fertilizer</span>
                    <span className="font-bold text-primary">250 g</span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/20 rounded-xl border border-accent/30">
                <p className="text-sm font-semibold text-foreground mb-1">💰 Estimated Cost</p>
                <p className="text-2xl font-bold text-accent">₹2,840</p>
              </div>
            </Card>

            {/* Application Schedule */}
            <Card className="p-6 border-0 shadow-card">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg text-foreground">Application Schedule</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex gap-3 p-3 bg-muted rounded-xl">
                  <div className="shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Pre-sowing</p>
                    <p className="text-sm text-muted-foreground">Apply compost 2 weeks before planting</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-muted rounded-xl">
                  <div className="shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">At Planting</p>
                    <p className="text-sm text-muted-foreground">Mix Neem cake and bio-fertilizer with soil</p>
                  </div>
                </div>

                <div className="flex gap-3 p-3 bg-muted rounded-xl">
                  <div className="shrink-0 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Mid-Growth</p>
                    <p className="text-sm text-muted-foreground">Top dress with compost after 30 days</p>
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button onClick={() => setCalculated(false)} variant="outline" className="flex-1 h-12 rounded-xl">
                Recalculate
              </Button>
              <Button className="flex-1 h-12 rounded-xl bg-success hover:bg-success/90">
                Buy Now
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Calculator;
