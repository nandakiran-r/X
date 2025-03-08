
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Calendar, Plus, Droplet, Moon, Activity, ExternalLink } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [cycleDay, setCycleDay] = useState<number | null>(null);
  const [nextPeriod, setNextPeriod] = useState<string | null>(null);

  useEffect(() => {
    // Load profile data
    const profileData = localStorage.getItem("sakhi-profile");
    if (profileData) {
      setProfile(JSON.parse(profileData));
    }
    
    // Simulate loading cycle data
    setTimeout(() => {
      setCycleDay(15);
      
      // Calculate next period date (sample)
      const today = new Date();
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + 14); // Assuming 14 days until next period
      setNextPeriod(nextDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }));
      
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogPeriod = () => {
    toast({
      title: "Period Started",
      description: "We've updated your cycle tracking",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your personalized dashboard...</p>
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
      >
        <h1 className="text-2xl font-bold mb-2">
          {profile ? `Hello, ${profile.name}` : "Hello"}
        </h1>
        <p className="text-muted-foreground mb-6">Here's your health overview</p>
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
                <p className="text-sm text-muted-foreground">Next period: {nextPeriod}</p>
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
                Log Period
              </Button>
              <Button variant="outline" size="sm">View Cycle</Button>
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
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Droplet className="h-8 w-8 text-blue-500 mb-2" />
              <h3 className="font-medium">Log Water</h3>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Moon className="h-8 w-8 text-purple-500 mb-2" />
              <h3 className="font-medium">Log Sleep</h3>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <Activity className="h-8 w-8 text-green-500 mb-2" />
              <h3 className="font-medium">Log Exercise</h3>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow cursor-pointer col-span-2">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
              <h3 className="font-medium">Log Symptoms</h3>
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
            <CardDescription>Based on your dosha profile</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-3">Drink warm ginger tea with a pinch of cinnamon to improve digestion and balance hormones naturally.</p>
            <Button variant="link" className="p-0 text-primary-foreground">
              Learn more
              <ExternalLink className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;
