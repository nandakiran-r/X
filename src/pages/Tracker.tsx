
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar as CalendarIcon, 
  DropletIcon, 
  MoonIcon, 
  SmileIcon,
  FrownIcon,
  MehIcon,
  PlusIcon,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Tracker = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [mood, setMood] = useState<string | null>(null);
  const [flow, setFlow] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const availableSymptoms = [
    "Cramps", "Bloating", "Headache", "Fatigue", 
    "Acne", "Mood swings", "Tender breasts", "Backache"
  ];

  const handleLogPeriod = () => {
    toast({
      title: "Period Logged",
      description: `You've logged your period for ${date.toLocaleDateString()}`,
    });
  };

  const toggleSymptom = (symptom: string) => {
    if (symptoms.includes(symptom)) {
      setSymptoms(symptoms.filter(s => s !== symptom));
    } else {
      setSymptoms([...symptoms, symptom]);
    }
  };

  const handleSaveSymptoms = () => {
    toast({
      title: "Symptoms Logged",
      description: "Your symptoms have been saved",
    });
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-2">Track Your Cycle</h1>
        <p className="text-muted-foreground mb-6">Log your period and symptoms</p>
      </motion.div>

      <Tabs defaultValue="period" className="mb-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="period">Period</TabsTrigger>
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="period" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Log Your Period</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="font-medium mb-2">Select Date</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? date.toLocaleDateString() : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => date && setDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="mb-4">
                  <p className="font-medium mb-2">Flow Intensity</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["Light", "Medium", "Heavy"].map(type => (
                      <Button
                        key={type}
                        variant={flow === type ? "default" : "outline"}
                        onClick={() => setFlow(type)}
                        className={flow === type ? "bg-sakhi-pink text-secondary-foreground hover:bg-sakhi-pink/90" : ""}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleLogPeriod} className="w-full bg-sakhi-lavender text-primary-foreground hover:bg-sakhi-lavender/90">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Log Period
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How Are You Feeling Today?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="font-medium mb-3">Mood</p>
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setMood("happy")}
                      className={`flex-1 mr-2 ${mood === "happy" ? "bg-sakhi-mint border-sakhi-mint" : ""}`}
                    >
                      <SmileIcon className="h-5 w-5 mr-1" />
                      Good
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setMood("neutral")}
                      className={`flex-1 mr-2 ${mood === "neutral" ? "bg-sakhi-blue border-sakhi-blue" : ""}`}
                    >
                      <MehIcon className="h-5 w-5 mr-1" />
                      Okay
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setMood("sad")}
                      className={`flex-1 ${mood === "sad" ? "bg-sakhi-peach border-sakhi-peach" : ""}`}
                    >
                      <FrownIcon className="h-5 w-5 mr-1" />
                      Low
                    </Button>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="font-medium mb-3">Symptoms</p>
                  <div className="grid grid-cols-2 gap-2">
                    {availableSymptoms.map(symptom => (
                      <Button
                        key={symptom}
                        variant="outline"
                        onClick={() => toggleSymptom(symptom)}
                        className={`text-sm justify-start ${symptoms.includes(symptom) ? "bg-sakhi-lavender/50 border-sakhi-lavender" : ""}`}
                      >
                        {symptoms.includes(symptom) ? (
                          <span className="mr-1">✓</span>
                        ) : null}
                        {symptom}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-medium mb-3">Track Health Metrics</p>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="flex items-center justify-center">
                      <DropletIcon className="h-4 w-4 mr-2 text-blue-500" />
                      Water Intake
                    </Button>
                    <Button variant="outline" className="flex items-center justify-center">
                      <MoonIcon className="h-4 w-4 mr-2 text-purple-500" />
                      Sleep Quality
                    </Button>
                  </div>
                </div>

                <Button onClick={handleSaveSymptoms} className="w-full bg-sakhi-lavender text-primary-foreground hover:bg-sakhi-lavender/90">
                  Save Today's Entries
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="history">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Cycle History</CardTitle>
                  <div className="flex">
                    <Button variant="ghost" size="icon" onClick={previousMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={nextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="rounded-md border"
                />
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <span className="text-sm">Period Days</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-purple-400 mr-2"></div>
                    <span className="text-sm">Fertile Window</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
                    <span className="text-sm">Ovulation</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Tracker;
