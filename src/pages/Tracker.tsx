import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DayContentProps } from 'react-day-picker';
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
import { DayContent } from "react-day-picker";

// Define interfaces for our data structures
interface PeriodEntry {
  date: string;
  flow: string;
}

interface SymptomEntry {
  date: string;
  mood: string | null;
  symptoms: string[];
}

interface TrackerData {
  periods: PeriodEntry[];
  symptoms: Record<string, SymptomEntry>;
}

const Tracker = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [mood, setMood] = useState<string | null>(null);
  const [flow, setFlow] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [trackerData, setTrackerData] = useState<TrackerData>({
    periods: [],
    symptoms: {}
  });

  const dateKey = date.toISOString().split('T')[0];

  const availableSymptoms = [
    "Cramps", "Bloating", "Headache", "Fatigue",
    "Acne", "Mood swings", "Tender breasts", "Backache"
  ];

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('trackerData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setTrackerData(parsedData);
      } catch (error) {
        console.error('Error parsing tracker data from localStorage', error);
        // Initialize with empty data if parsing fails
        setTrackerData({
          periods: [],
          symptoms: {}
        });
      }
    }
  }, []);

  // Load current day's data when date changes
  useEffect(() => {
    const currentDateKey = date.toISOString().split('T')[0];

    // Check if we have symptom data for this date
    const symptomData = trackerData.symptoms[currentDateKey];
    if (symptomData) {
      setMood(symptomData.mood);
      setSymptoms(symptomData.symptoms);
    } else {
      // Reset if no data
      setMood(null);
      setSymptoms([]);
    }

    // Check if we have period data for this date
    const periodData = trackerData.periods.find(p => p.date === currentDateKey);
    if (periodData) {
      setFlow(periodData.flow);
    } else {
      setFlow(null);
    }
  }, [date, trackerData]);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('trackerData', JSON.stringify(trackerData));
  }, [trackerData]);

  const handleLogPeriod = () => {
    if (!flow) {
      toast({
        title: "Flow intensity required",
        description: "Please select a flow intensity",
        variant: "destructive"
      });
      return;
    }
  
    const dateKey = date.toLocaleDateString('en-CA'); // Use local date in YYYY-MM-DD format
  
    const newPeriodEntry: PeriodEntry = {
      date: dateKey,
      flow: flow
    };
  
    // Check if an entry for this date already exists
    const existingEntryIndex = trackerData.periods.findIndex(p => p.date === dateKey);
  
    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedPeriods = [...trackerData.periods];
      updatedPeriods[existingEntryIndex] = newPeriodEntry;
  
      setTrackerData({
        ...trackerData,
        periods: updatedPeriods
      });
    } else {
      // Add new entry
      setTrackerData({
        ...trackerData,
        periods: [...trackerData.periods, newPeriodEntry]
      });
    }
  
    // Save to trackerData localStorage
    localStorage.setItem('trackerData', JSON.stringify({
      ...trackerData,
      periods: existingEntryIndex >= 0 
        ? [...trackerData.periods.slice(0, existingEntryIndex), newPeriodEntry, ...trackerData.periods.slice(existingEntryIndex + 1)]
        : [...trackerData.periods, newPeriodEntry]
    }));
  
    // SYNC WITH DASHBOARD DATA
    // Get existing cycle data
    let cycleData = JSON.parse(localStorage.getItem("sakhi-cycle") || "{}");
  
    // Update dashboard format data
    cycleData[dateKey] = { periodStarted: true };
  
    // Save updated dashboard data
    localStorage.setItem("sakhi-cycle", JSON.stringify(cycleData));
  
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
    const newSymptomEntry: SymptomEntry = {
      date: dateKey,
      mood,
      symptoms
    };

    setTrackerData({
      ...trackerData,
      symptoms: {
        ...trackerData.symptoms,
        [dateKey]: newSymptomEntry
      }
    });

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

  // Function to check if a date has period data
  const isPeriodDay = (day: Date) => {
    const dayStr = day.toLocaleDateString('en-CA'); // Use local date in YYYY-MM-DD format
    return trackerData.periods.some(p => p.date === dayStr);
  };

  // Calculate fertility window and ovulation day (simplified example)
  const getFertilityInfo = () => {
    // Sort periods by date
    if (trackerData.periods.length === 0) return null;
  
    const sortedPeriods = [...trackerData.periods].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  
    // Use the most recent period as reference
    const lastPeriod = new Date(sortedPeriods[sortedPeriods.length - 1].date);
  
    // Estimated ovulation day (14 days after period start in a 28-day cycle)
    const ovulationDay = new Date(lastPeriod);
    ovulationDay.setDate(lastPeriod.getDate() + 14);
  
    // Fertility window (5 days before ovulation + day of ovulation)
    const fertilityStart = new Date(ovulationDay);
    fertilityStart.setDate(ovulationDay.getDate() - 5);
  
    return {
      ovulation: ovulationDay.toLocaleDateString('en-CA'), // Use local date
      fertilityWindow: Array.from({ length: 6 }, (_, i) => {
        const day = new Date(fertilityStart);
        day.setDate(fertilityStart.getDate() + i);
        return day.toLocaleDateString('en-CA'); // Use local date
      })
    };
  };

  const fertilityInfo = getFertilityInfo();

  // Custom DayContent component for the calendar
  const CustomDayContent = (props: DayContentProps) => {
    const { date, activeModifiers } = props;
    const dayStr = date.toISOString().split('T')[0];
    let className = "h-8 w-8 p-0 font-normal flex items-center justify-center";

    // Check if this day has a period entry
    if (isPeriodDay(date)) {
      className += " bg-red-400 text-white rounded-full";
    }
    // Check if this is ovulation day
    else if (fertilityInfo && dayStr === fertilityInfo.ovulation) {
      className += " bg-blue-400 text-white rounded-full";
    }
    // Check if this is in the fertility window
    else if (fertilityInfo && fertilityInfo.fertilityWindow.includes(dayStr)) {
      className += " bg-purple-400 text-white rounded-full";
    }

    return (
      <div className={className}>
        <DayContent {...props} />
      </div>
    );
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
                  month={currentMonth}
                  components={{
                    DayContent: CustomDayContent as any // Use 'as any' to bypass type checking if necessary
                  }}
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