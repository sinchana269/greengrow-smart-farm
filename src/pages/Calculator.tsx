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
  const [selectedCrop, setSelectedCrop] = useState("");
  const [landArea, setLandArea] = useState(1);
  const [selectedSeason, setSelectedSeason] = useState("");

  const [result, setResult] = useState<any>(null);

  const handleCalculate = async () => {
    if (!selectedCrop || !selectedSeason || !landArea) {
      alert("Please fill all fields!");
      return;
    }

    const payload = {
      crop: selectedCrop,
      area: landArea,
      season: selectedSeason,
    };

    try {
      const response = await fetch("https://greengrow-backend-9lb9.onrender.com/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Backend result:", data);

      setResult(data);
      setCalculated(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Backend not reachable!");
    }
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
                <Select onValueChange={(value) => setSelectedCrop(value)}>
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
                <Input
                  type="number"
                  placeholder="Enter area in acres"
                  value={landArea}
                  onChange={(e) => setLandArea(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label>Growing Season</Label>
                <Select onValueChange={(value) => setSelectedSeason(value)}>
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
            <Card className="p-6 border-0 shadow-card bg-gradient-to-br from-card to-primary/5">
              <h3 className="font-bold text-lg text-foreground mb-4">📊 Required Organic Inputs</h3>

              <p className="text-sm text-muted-foreground mb-4">
                For {selectedCrop} – {landArea} acre – {selectedSeason} season
              </p>

              <div className="space-y-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Compost</span>
                  <span className="font-bold text-primary">{result.compost} kg</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span className="font-medium">Neem Cake</span>
                  <span className="font-bold text-primary">{result.neem_cake} kg</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span className="font-medium">Bio-fertilizer</span>
                  <span className="font-bold text-primary">{result.bio_fertilizer} g</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-accent/20 rounded-xl border border-accent/30">
                <p className="text-sm font-semibold">💰 Estimated Cost</p>
                <p className="text-2xl font-bold text-accent">₹{result.cost}</p>
              </div>
            </Card>

            <Button onClick={() => setCalculated(false)} className="w-full h-12 mt-4">
              Recalculate
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Calculator;
