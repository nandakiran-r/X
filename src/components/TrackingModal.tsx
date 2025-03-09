
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { X } from "lucide-react";

interface TrackingModalProps {
  type: "water" | "sleep" | "exercise" | "symptoms";
  onClose: () => void;
}

const TrackingModal = ({ type, onClose }: TrackingModalProps) => {
  const { toast } = useToast();
  const [waterAmount, setWaterAmount] = useState(4);
  const [sleepHours, setSleepHours] = useState(7);
  const [exerciseMinutes, setExerciseMinutes] = useState(30);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [symptomNotes, setSymptomNotes] = useState("");

  const symptoms = [
    "Cramps", "Bloating", "Headache", "Fatigue", 
    "Mood swings", "Acne", "Back pain", "Nausea"
  ];

  const handleSubmit = () => {
    const date = new Date().toISOString().split('T')[0];
    
    let existingData = JSON.parse(localStorage.getItem('sakhi-tracking') || '{}');
    if (!existingData[date]) {
      existingData[date] = {};
    }

    let message = "";
    
    switch (type) {
      case "water":
        existingData[date].water = waterAmount;
        message = `Logged ${waterAmount} glasses of water`;
        break;
      case "sleep":
        existingData[date].sleep = sleepHours;
        message = `Logged ${sleepHours} hours of sleep`;
        break;
      case "exercise":
        existingData[date].exercise = exerciseMinutes;
        message = `Logged ${exerciseMinutes} minutes of exercise`;
        break;
      case "symptoms":
        existingData[date].symptoms = {
          list: selectedSymptoms,
          notes: symptomNotes
        };
        message = "Symptoms logged successfully";
        break;
    }

    localStorage.setItem('sakhi-tracking', JSON.stringify(existingData));
    
    toast({
      title: "Tracking Updated",
      description: message,
    });

    onClose();
  };

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  };

  const renderContent = () => {
    switch (type) {
      case "water":
        return (
          <>
            <h3 className="text-lg font-medium mb-4">How many glasses of water did you drink today?</h3>
            <div className="mb-4">
              <div className="text-center mb-2 text-2xl font-bold">{waterAmount}</div>
              <Slider
                value={[waterAmount]}
                min={0}
                max={12}
                step={1}
                onValueChange={(value) => setWaterAmount(value[0])}
                className="mb-6"
              />
            </div>
          </>
        );
      
      case "sleep":
        return (
          <>
            <h3 className="text-lg font-medium mb-4">How many hours did you sleep last night?</h3>
            <div className="mb-4">
              <div className="text-center mb-2 text-2xl font-bold">{sleepHours} hours</div>
              <Slider
                value={[sleepHours]}
                min={0}
                max={12}
                step={0.5}
                onValueChange={(value) => setSleepHours(value[0])}
                className="mb-6"
              />
            </div>
          </>
        );
        
      case "exercise":
        return (
          <>
            <h3 className="text-lg font-medium mb-4">How many minutes did you exercise today?</h3>
            <div className="mb-4">
              <div className="text-center mb-2 text-2xl font-bold">{exerciseMinutes} minutes</div>
              <Slider
                value={[exerciseMinutes]}
                min={0}
                max={120}
                step={5}
                onValueChange={(value) => setExerciseMinutes(value[0])}
                className="mb-6"
              />
            </div>
          </>
        );
        
      case "symptoms":
        return (
          <>
            <h3 className="text-lg font-medium mb-4">Select any symptoms you're experiencing:</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {symptoms.map(symptom => (
                <Button
                  key={symptom}
                  type="button"
                  variant={selectedSymptoms.includes(symptom) ? "default" : "outline"}
                  onClick={() => toggleSymptom(symptom)}
                  className="justify-start"
                >
                  {symptom}
                </Button>
              ))}
            </div>
            <div className="mb-4">
              <Label htmlFor="notes">Additional notes:</Label>
              <Input 
                id="notes"
                value={symptomNotes}
                onChange={(e) => setSymptomNotes(e.target.value)}
                placeholder="Describe any other symptoms..."
                className="mt-1"
              />
            </div>
          </>
        );
    }
  };

  const getTitle = () => {
    switch (type) {
      case "water": return "Log Water Intake";
      case "sleep": return "Log Sleep";
      case "exercise": return "Log Exercise";
      case "symptoms": return "Log Symptoms";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>{getTitle()}</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {renderContent()}
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TrackingModal;
