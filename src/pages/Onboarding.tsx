
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const [profile, setProfile] = useState({
    name: "",
    age: "",
    cycleLength: "",
    conditions: {
      pcos: false,
      thyroid: false,
      diabetes: false,
      none: false
    },
    dosha: "",
    goals: []
  });

  const nextStep = () => {
    const nextStepNumber = step + 1;
    setStep(nextStepNumber);
    setProgress(nextStepNumber * 20);
  };

  const prevStep = () => {
    const prevStepNumber = step - 1;
    if (prevStepNumber < 1) return;
    setStep(prevStepNumber);
    setProgress(prevStepNumber * 20);
  };

  const updateProfile = (key: string, value: any) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const updateCondition = (condition: string, value: boolean) => {
    setProfile(prev => ({
      ...prev,
      conditions: {
        ...prev.conditions,
        [condition]: value,
        none: condition === "none" ? value : value ? false : prev.conditions.none
      }
    }));
  };

  const completeOnboarding = () => {
    localStorage.setItem("sakhi-profile", JSON.stringify(profile));
    localStorage.setItem("sakhi-onboarded", "true");
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-center">Tell us about yourself</h2>
            <p className="text-muted-foreground text-center mb-6">
              This helps us personalize your experience
            </p>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => updateProfile("name", e.target.value)}
                  placeholder="Enter your name"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="age">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.age}
                  onChange={(e) => updateProfile("age", e.target.value)}
                  placeholder="Enter your age"
                  className="mt-1"
                />
              </div>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-center">Your Cycle</h2>
            <p className="text-muted-foreground text-center mb-6">
              This helps us track your health patterns
            </p>
            
            <div>
              <Label htmlFor="cycleLength">Menstrual Cycle Length (if known)</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Average days from the first day of one period to the first day of the next
              </p>
              <Input
                id="cycleLength"
                type="number"
                value={profile.cycleLength}
                onChange={(e) => updateProfile("cycleLength", e.target.value)}
                placeholder="e.g., 28 days"
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-2">
                It's okay if you don't know exactly, you can update this later.
              </p>
            </div>
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-center">Health Conditions</h2>
            <p className="text-muted-foreground text-center mb-6">
              Select any conditions you currently have
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="pcos" 
                  checked={profile.conditions.pcos}
                  onCheckedChange={(checked) => updateCondition("pcos", checked === true)}
                />
                <Label htmlFor="pcos">PCOS</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="thyroid" 
                  checked={profile.conditions.thyroid}
                  onCheckedChange={(checked) => updateCondition("thyroid", checked === true)}
                />
                <Label htmlFor="thyroid">Thyroid Issues</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="diabetes" 
                  checked={profile.conditions.diabetes}
                  onCheckedChange={(checked) => updateCondition("diabetes", checked === true)}
                />
                <Label htmlFor="diabetes">Diabetes</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="none" 
                  checked={profile.conditions.none}
                  onCheckedChange={(checked) => updateCondition("none", checked === true)}
                />
                <Label htmlFor="none">None of the above</Label>
              </div>
            </div>
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-center">Your Dosha</h2>
            <p className="text-muted-foreground text-center mb-6">
              In Ayurveda, your body type influences recommendations
            </p>
            
            <RadioGroup 
              value={profile.dosha} 
              onValueChange={(value) => updateProfile("dosha", value)}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-sakhi-gray/50 transition-colors">
                <RadioGroupItem value="vata" id="vata" />
                <Label htmlFor="vata" className="flex-1 cursor-pointer">
                  <span className="font-medium">Vata</span>
                  <p className="text-sm text-muted-foreground">Thin, fast-paced, creative, anxious when imbalanced</p>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-sakhi-gray/50 transition-colors">
                <RadioGroupItem value="pitta" id="pitta" />
                <Label htmlFor="pitta" className="flex-1 cursor-pointer">
                  <span className="font-medium">Pitta</span>
                  <p className="text-sm text-muted-foreground">Medium build, intense, focused, irritable when imbalanced</p>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-sakhi-gray/50 transition-colors">
                <RadioGroupItem value="kapha" id="kapha" />
                <Label htmlFor="kapha" className="flex-1 cursor-pointer">
                  <span className="font-medium">Kapha</span>
                  <p className="text-sm text-muted-foreground">Solid build, calm, grounded, lethargic when imbalanced</p>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-sakhi-gray/50 transition-colors">
                <RadioGroupItem value="unknown" id="unknown" />
                <Label htmlFor="unknown" className="flex-1 cursor-pointer">
                  <span className="font-medium">I'm not sure</span>
                  <p className="text-sm text-muted-foreground">We'll help you determine this later</p>
                </Label>
              </div>
            </RadioGroup>
          </motion.div>
        );
      
      case 5:
        return (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-center">Your Health Goals</h2>
            <p className="text-muted-foreground text-center mb-6">
              What would you like to focus on?
            </p>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: "hormones", label: "Balance hormones naturally" },
                { id: "pcos", label: "Manage PCOS symptoms" },
                { id: "stress", label: "Reduce stress & improve sleep" },
                { id: "weight", label: "Lose weight & feel more energetic" },
                { id: "skin", label: "Improve skin & hair health" }
              ].map(goal => (
                <div 
                  key={goal.id}
                  onClick={() => {
                    const goals = profile.goals.includes(goal.id)
                      ? profile.goals.filter(g => g !== goal.id)
                      : [...profile.goals, goal.id];
                    updateProfile("goals", goals);
                  }}
                  className={`p-4 rounded-xl border border-border cursor-pointer transition-all ${
                    profile.goals.includes(goal.id) 
                      ? "bg-sakhi-lavender border-primary" 
                      : "hover:bg-sakhi-gray/30"
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      profile.goals.includes(goal.id) 
                        ? "border-primary bg-primary" 
                        : "border-muted-foreground"
                    }`}>
                      {profile.goals.includes(goal.id) && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    <span className="ml-3 font-medium">{goal.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakhi-lavender/30 via-background to-sakhi-pink/30 py-8 px-4">
      <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6">
        <Progress value={progress} className="mb-8" />
        
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        
        <div className="flex justify-between mt-8">
          <Button
            onClick={prevStep}
            variant="outline"
            className={`${step === 1 ? "invisible" : ""}`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {step < 5 ? (
            <Button onClick={nextStep} className="btn-primary">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={completeOnboarding} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
