
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

type Question = {
  id: number;
  text: string;
  options: {
    vata: string;
    pitta: string;
    kapha: string;
  };
};

const questions: Question[] = [
  {
    id: 1,
    text: "How would you describe your body frame?",
    options: {
      vata: "Thin, light, difficult to gain weight",
      pitta: "Medium, athletic build, gains/loses weight easily",
      kapha: "Solid, heavy bone structure, gains weight easily"
    }
  },
  {
    id: 2,
    text: "How is your energy level throughout the day?",
    options: {
      vata: "Variable, comes in bursts",
      pitta: "Strong, intense, goal-oriented",
      kapha: "Steady, enduring, but slow to start"
    }
  },
  {
    id: 3,
    text: "Which best describes your menstrual patterns?",
    options: {
      vata: "Irregular cycles, light flow, may skip periods",
      pitta: "Regular cycles, moderate to heavy flow, may get intense cramps",
      kapha: "Regular cycles, heavy flow, may experience bloating"
    }
  },
  {
    id: 4,
    text: "How do you typically respond to stress?",
    options: {
      vata: "Anxiety, worry, overthinking",
      pitta: "Irritability, frustration, anger",
      kapha: "Withdrawal, becoming quiet, or emotionally eating"
    }
  },
  {
    id: 5,
    text: "What is your skin typically like?",
    options: {
      vata: "Dry, rough, or flaky",
      pitta: "Sensitive, reddish, prone to rashes",
      kapha: "Oily, thick, moist"
    }
  }
];

interface DoshaQuestionnaireProps {
  onComplete: (dosha: string) => void;
  onCancel: () => void;
}

const DoshaQuestionnaire = ({ onComplete, onCancel }: DoshaQuestionnaireProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { toast } = useToast();

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateDosha();
    }
  };

  const calculateDosha = () => {
    const counts = {
      vata: 0,
      pitta: 0,
      kapha: 0
    };

    Object.values(answers).forEach(answer => {
      counts[answer as keyof typeof counts]++;
    });

    let dominantDosha = "vata";
    let maxCount = counts.vata;

    if (counts.pitta > maxCount) {
      dominantDosha = "pitta";
      maxCount = counts.pitta;
    }
    
    if (counts.kapha > maxCount) {
      dominantDosha = "kapha";
    }

    toast({
      title: "Questionnaire Complete",
      description: `Your dominant dosha appears to be ${dominantDosha.charAt(0).toUpperCase() + dominantDosha.slice(1)}`
    });

    onComplete(dominantDosha);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (currentQuestion >= questions.length) {
    return null;
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Dosha Questionnaire</CardTitle>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className="bg-primary h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-medium mb-4">{question.text}</h3>
          
          <RadioGroup value={answers[currentQuestion]} className="space-y-3">
            <div className="flex items-start space-x-2">
              <RadioGroupItem 
                value="vata" 
                id="vata" 
                onClick={() => handleAnswer("vata")}
              />
              <Label htmlFor="vata" className="font-normal">{question.options.vata}</Label>
            </div>
            
            <div className="flex items-start space-x-2">
              <RadioGroupItem 
                value="pitta" 
                id="pitta" 
                onClick={() => handleAnswer("pitta")}
              />
              <Label htmlFor="pitta" className="font-normal">{question.options.pitta}</Label>
            </div>
            
            <div className="flex items-start space-x-2">
              <RadioGroupItem 
                value="kapha" 
                id="kapha" 
                onClick={() => handleAnswer("kapha")}
              />
              <Label htmlFor="kapha" className="font-normal">{question.options.kapha}</Label>
            </div>
          </RadioGroup>
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={currentQuestion === 0 ? onCancel : handlePrevious}
            >
              {currentQuestion === 0 ? "Cancel" : "Back"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DoshaQuestionnaire;
