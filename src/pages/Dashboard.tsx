import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Calendar,
  Plus,
  Droplet,
  Moon,
  Activity,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import DoshaQuestionnaire from "@/components/DoshaQuestionnaire";
import TrackingModal from "@/components/TrackingModal";

const Dashboard = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cycleDay, setCycleDay] = useState<number | null>(null);
  const [nextPeriod, setNextPeriod] = useState<string | null>(null);
  const [periodActive, setPeriodActive] = useState(false);
  const [ayurvedicTip, setAyurvedicTip] = useState({
    tip: "Loading your personalized tip...",
    extendedTip: "Loading your detailed ayurvedic recommendation...",
    isLoading: true,
  });
  const [showExtendedTip, setShowExtendedTip] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [trackingType, setTrackingType] = useState<
    "water" | "sleep" | "exercise" | "symptoms" | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load profile data from localStorage
    const profileData = localStorage.getItem("sakhi-profile");

    if (profileData) {
      const parsedProfile = JSON.parse(profileData);
      setProfile(parsedProfile);

      console.log("Profile data loaded", parsedProfile);

      // Set cycle day correctly from profile
      setCycleDay(parsedProfile.cycleLength);

      // Calculate next period date
      const today = new Date();
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + parsedProfile.cycleLength); // Use user's cycle length
      setNextPeriod(
        nextDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })
      );

      // Get Ayurvedic tip based on profile
      getAyurvedicTip(parsedProfile);
    } else {
      navigate("/onboarding");
    }

    calculateCycleInfo();
    setLoading(false);
  }, []);

  // Calculate cycle information based on stored data
  const calculateCycleInfo = () => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0];
    const cycleData = JSON.parse(localStorage.getItem("sakhi-cycle") || "{}");
    
    // Get cycle settings from profile or use defaults
    const cycleLength = profile?.cycleLength || 28;
    const periodLength = profile?.periodLength || 5;
    
    // Find the most recent period start date
    const periodDates = Object.keys(cycleData)
      .filter(date => cycleData[date] && cycleData[date].periodStarted === true)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    if (periodDates.length === 0) {
      // No period data yet
      setCycleDay(0);
      setNextPeriod("Not enough data");
      setPeriodActive(false);
      return;
    }
    
    const lastPeriodStart = new Date(periodDates[0]);
    
    // Calculate days since last period started - FIX: use getTime() to get number type
    const daysSinceStart = Math.floor(
      (today.getTime() - lastPeriodStart.getTime()) / (1000 * 60 * 60 * 24)
    );
    
    // Determine if currently on period
    const isOnPeriod = daysSinceStart < periodLength;
    setPeriodActive(isOnPeriod);
    
    // Calculate cycle day (1-based)
    const currentCycleDay = (daysSinceStart % cycleLength) + 1;
    setCycleDay(currentCycleDay);
    
    // Calculate next period date
    const daysUntilNextPeriod = isOnPeriod 
      ? cycleLength - daysSinceStart 
      : cycleLength - (daysSinceStart % cycleLength);
    
    const nextPeriodDate = new Date(today);
    nextPeriodDate.setDate(today.getDate() + daysUntilNextPeriod);
    
    setNextPeriod(
      nextPeriodDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })
    );
    
    // Check if period started today
    if (cycleData[todayStr] && cycleData[todayStr].periodStarted === true) {
      setPeriodActive(true);
    }
  };

  const getAyurvedicTip = async (profile: any) => {
    const API_KEY = import.meta.env.VITE_GEMINI_API;

    if (!API_KEY) {
      // Fallback if API key is not available
      setAyurvedicTip({
        tip: "Incorporate warming, grounding spices like cinnamon and ginger into your meals to balance vata, especially during spring which can aggravate vata.",
        extendedTip:
          "As a vata-dominant woman, the changeable spring season can further increase vata, potentially disrupting hormones. Including warming spices in your diet, like cinnamon, ginger, and cardamom, helps to ground vata. Establishing a regular routine with consistent mealtimes and 7-8 hours of sleep offers stability and supports your body's natural rhythms, crucial for hormonal balance.",
        isLoading: false,
      });
      return;
    }

    const genAI = new GoogleGenerativeAI(API_KEY);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Create prompt with user's profile information
      const prompt = `Generate Ayurvedic health advice for a woman with the following profile:
      - Age: ${profile.age}
      - Dominant dosha: ${profile.dosha || "unknown"}
      - Current cycle day: ${profile.cycleLength}
      - Current season: ${getCurrentSeason()}
      
      Provide two versions:
      1. A brief tip (maximum 2 sentences) that is specific, actionable, and related to women's health or hormonal balance.
      2. An extended explanation (about 3-4 sentences) that provides more context and detailed guidance.
      
      Format the response as JSON with two fields: "shortTip" and "extendedTip".`;

      // Generate content
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from the response
      // The API returns markdown code blocks, so we need to extract just the JSON part
      let jsonData;
      try {
        // Try to extract JSON from markdown code block if present
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
          jsonData = JSON.parse(jsonMatch[1]);
        } else {
          // If no markdown, try parsing the whole text as JSON
          jsonData = JSON.parse(text);
        }

        setAyurvedicTip({
          tip: jsonData.shortTip,
          extendedTip: jsonData.extendedTip,
          isLoading: false,
        });
      } catch (parseError) {
        console.error("Error parsing tip JSON:", parseError);
        // Fallback in case JSON parsing fails
        setAyurvedicTip({
          tip: "Incorporate warming, grounding spices like cinnamon and ginger into your meals to balance vata, especially during spring which can aggravate vata.",
          extendedTip:
            "As a vata-dominant woman, the changeable spring season can further increase vata, potentially disrupting hormones. Including warming spices in your diet, like cinnamon, ginger, and cardamom, helps to ground vata. Establishing a regular routine with consistent mealtimes and 7-8 hours of sleep offers stability and supports your body's natural rhythms, crucial for hormonal balance.",
          isLoading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching Ayurvedic tip:", error);
      setAyurvedicTip({
        tip: "Incorporate warming, grounding spices like cinnamon and ginger into your meals to balance vata, especially during spring which can aggravate vata.",
        extendedTip:
          "As a vata-dominant woman, the changeable spring season can further increase vata, potentially disrupting hormones. Including warming spices in your diet, like cinnamon, ginger, and cardamom, helps to ground vata. Establishing a regular routine with consistent mealtimes and 7-8 hours of sleep offers stability and supports your body's natural rhythms, crucial for hormonal balance.",
        isLoading: false,
      });
    }
  };

  // Helper function to get current season
  const getCurrentSeason = () => {
    const now = new Date();
    const month = now.getMonth();

    if (month >= 2 && month <= 4) return "Spring";
    if (month >= 5 && month <= 7) return "Summer";
    if (month >= 8 && month <= 10) return "Fall";
    return "Winter";
  };

  const handleLogPeriod = () => {
    const today = new Date();
    const date = today.toISOString().split("T")[0];

    // Get existing cycle data
    let cycleData = JSON.parse(localStorage.getItem("sakhi-cycle") || "{}");

    // Check if we're logging a new period or ending current one
    if (periodActive && cycleDay <= (profile?.periodLength || 5)) {
      // User is ending period early
      cycleData[date] = { periodEnded: true };
      setPeriodActive(false);
      toast({
        title: "Period Ended",
        description: "We've updated your cycle tracking",
      });
    } else {
      // Starting a new period
      cycleData[date] = { periodStarted: true };
      setPeriodActive(true);
      
      // Reset cycle day to 1
      setCycleDay(1);
      
      // Calculate next period date
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + (profile?.cycleLength || 28));
      setNextPeriod(
        nextDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })
      );
      
      toast({
        title: "Period Started",
        description: "We've updated your cycle tracking",
      });
    }
    
    // Save updated data
    localStorage.setItem("sakhi-cycle", JSON.stringify(cycleData));
  };

  const handleLearnMore = () => {
    setShowExtendedTip(!showExtendedTip);
  };

  const handleOpenTracker = (
    type: "water" | "sleep" | "exercise" | "symptoms"
  ) => {
    setTrackingType(type);
  };

  const updateDosha = (dosha: string) => {
    if (profile) {
      const updatedProfile = { ...profile, dosha };
      setProfile(updatedProfile);
      localStorage.setItem("sakhi-profile", JSON.stringify(updatedProfile));

      // Refresh Ayurvedic tip based on new dosha
      getAyurvedicTip(updatedProfile);
    }
    setShowQuestionnaire(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Loading your personalized dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-6 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {profile ? `Hello, ${profile.name}` : "Hello"}
          </h1>
          <p className="text-muted-foreground mb-6">
            Here's your health overview
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowQuestionnaire(true)}
          title="Retake dosha questionnaire"
        >
          <HelpCircle className="h-5 w-5" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-6"
      >
         <Card className="bg-sakhi-lavender/20 border-sakhi-lavender">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-medium">Cycle Day</h3>
            <div className="text-3xl font-bold">{cycleDay}</div>
            <p className="text-sm text-muted-foreground">
              {periodActive ? `Period day ${cycleDay}` : `Next period: ${nextPeriod}`}
            </p>
          </div>
          <div className="w-16 h-16 rounded-full bg-sakhi-lavender flex items-center justify-center">
            <Calendar className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button
            onClick={handleLogPeriod}
            size="sm"
            className="bg-sakhi-pink hover:bg-sakhi-pink/90 text-secondary-foreground"
          >
            <Plus className="h-4 w-4 mr-1" />
            {periodActive ? "End Period" : "Log Period"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/tracker")}
          >
            View Cycle
          </Button>
        </div>
      </CardContent>
    </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-4 mb-6"
      >
        <h2 className="text-lg font-semibold">Track Today</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card
            onClick={() => handleOpenTracker("water")}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Droplet className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-medium">Log Water</h3>
            </CardContent>
          </Card>

          <Card
            onClick={() => handleOpenTracker("sleep")}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Moon className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="font-medium">Log Sleep</h3>
            </CardContent>
          </Card>
       
          <Card
            onClick={() => handleOpenTracker("exercise")}
            className="hover:shadow-md transition-shadow cursor-pointer"
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Activity className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="font-medium">Log Exercise</h3>
            </CardContent>
          </Card>

          <Card
            onClick={() => handleOpenTracker("symptoms")}
            className="hover:shadow-md transition-shadow cursor-pointer col-span-1"
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
              <h3 className="font-medium">Log Symptoms</h3>
            </CardContent>
          </Card>
          <Card
            className="hover:shadow-md transition-shadow cursor-pointer col-span-2"
            onClick={() => {
              navigate("/pcos");
            }}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Activity className="h-8 w-8 text-red-500 mb-2" />
              <h3 className="font-medium">PCOS Risk Assessment</h3>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Card className="bg-sakhi-mint/30 border-sakhi-mint">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Today's Ayurvedic Tip</CardTitle>
            <CardDescription>
              Based on your {profile?.dosha ? profile.dosha : "health"} profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className={ayurvedicTip.isLoading ? "opacity-50" : ""}>
              <p className="mb-3">{ayurvedicTip.tip}</p>
              {showExtendedTip && (
                <p className="mb-3 text-sm text-muted-foreground">
                  {ayurvedicTip.extendedTip}
                </p>
              )}
              {ayurvedicTip.isLoading && (
                <div className="w-6 h-6 border-2 border-t-sakhi-mint border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-2"></div>
              )}
              <Button
                variant="link"
                className="p-0 text-primary-foreground"
                onClick={handleLearnMore}
              >
                {showExtendedTip ? "Show less" : "Learn more"}
                <ExternalLink className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {showQuestionnaire && (
        <DoshaQuestionnaire
          onComplete={updateDosha}
          onCancel={() => setShowQuestionnaire(false)}
        />
      )}

      {trackingType && (
        <TrackingModal
          type={trackingType}
          onClose={() => setTrackingType(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
