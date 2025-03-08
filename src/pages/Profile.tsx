
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Bell, Moon, Sun, LogOut, User, Settings } from "lucide-react";

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [reminders, setReminders] = useState(true);
  const [waterGoal, setWaterGoal] = useState(8);

  useEffect(() => {
    // Load profile data
    const profileData = localStorage.getItem("sakhi-profile");
    if (profileData) {
      setProfile(JSON.parse(profileData));
    }
  }, []);

  const handleLogout = () => {
    // Clear profile data
    localStorage.removeItem("sakhi-onboarded");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
    navigate("/");
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Actual dark mode implementation would go here
    toast({
      title: `${!darkMode ? "Dark" : "Light"} Mode Activated`,
      description: `App theme has been changed to ${!darkMode ? "dark" : "light"} mode`
    });
  };

  const getHealthConditions = () => {
    if (!profile?.conditions) return "None";
    
    const conditions = [];
    if (profile.conditions.pcos) conditions.push("PCOS");
    if (profile.conditions.thyroid) conditions.push("Thyroid");
    if (profile.conditions.diabetes) conditions.push("Diabetes");
    
    return conditions.length > 0 ? conditions.join(", ") : "None";
  };

  const getHealthGoals = () => {
    if (!profile?.goals || profile.goals.length === 0) return [];
    
    const goalMap: Record<string, string> = {
      "hormones": "Balance hormones naturally",
      "pcos": "Manage PCOS symptoms",
      "stress": "Reduce stress & improve sleep",
      "weight": "Lose weight & feel energetic",
      "skin": "Improve skin & hair health"
    };
    
    return profile.goals.map((goal: string) => goalMap[goal] || goal);
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your profile...</p>
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
        <h1 className="text-2xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground mb-6">Manage your account and preferences</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mb-6"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-sakhi-lavender flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-lg">{profile.name}</h3>
                <p className="text-muted-foreground">Age: {profile.age}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Dosha Type</p>
                <p className="font-medium capitalize">{profile.dosha || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cycle Length</p>
                <p className="font-medium">{profile.cycleLength ? `${profile.cycleLength} days` : "Not specified"}</p>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-muted-foreground">Health Conditions</p>
              <p className="font-medium">{getHealthConditions()}</p>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground mb-2">Health Goals</p>
              <div className="flex flex-wrap gap-2">
                {getHealthGoals().map((goal, index) => (
                  <Badge key={index} className="bg-sakhi-lavender/20 text-primary-foreground hover:bg-sakhi-lavender/30">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6"
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">App Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Bell className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive app notifications</p>
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Settings className="h-5 w-5 mr-3 text-muted-foreground" />
                <div>
                  <p className="font-medium">Period Reminders</p>
                  <p className="text-sm text-muted-foreground">Get notified before your period</p>
                </div>
              </div>
              <Switch 
                checked={reminders} 
                onCheckedChange={setReminders}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {darkMode ? (
                  <Moon className="h-5 w-5 mr-3 text-muted-foreground" />
                ) : (
                  <Sun className="h-5 w-5 mr-3 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Toggle light/dark theme</p>
                </div>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={handleDarkModeToggle}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Daily Water Goal</p>
                <span className="text-sm font-medium">{waterGoal} glasses</span>
              </div>
              <Slider
                value={[waterGoal]}
                min={4}
                max={12}
                step={1}
                onValueChange={(value) => setWaterGoal(value[0])}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Button 
          variant="outline" 
          className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Log Out
        </Button>
      </motion.div>
    </div>
  );
};

export default Profile;
