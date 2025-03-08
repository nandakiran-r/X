
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Welcome = () => {
  const navigate = useNavigate();

  // Check if user has completed onboarding
  useEffect(() => {
    const isOnboarded = localStorage.getItem("sakhi-onboarded");
    if (isOnboarded === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sakhi-lavender/30 via-background to-sakhi-pink/30 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md mx-auto text-center"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          className="w-32 h-32 rounded-full bg-gradient-to-br from-sakhi-lavender to-sakhi-pink flex items-center justify-center mx-auto mb-8 shadow-md"
        >
          <h1 className="text-3xl font-bold text-primary-foreground">HS</h1>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-3xl font-bold mb-3 text-foreground"
        >
          Welcome to <span className="text-primary-foreground">Her</span>
          <span className="text-secondary-foreground">Sakhi</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg text-muted-foreground mb-8"
        >
          Your Ayurvedic Companion for Women's Health
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button 
            onClick={() => navigate("/onboarding")}
            className="btn-primary w-full mb-4 text-lg"
          >
            Get Started
          </Button>
          
          <p className="text-sm text-muted-foreground mt-6">
            A personalized companion that understands your unique needs
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
