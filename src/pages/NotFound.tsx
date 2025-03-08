
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sakhi-lavender/30 via-background to-sakhi-pink/30 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-9xl font-bold text-primary-foreground mb-6"
        >
          404
        </motion.div>
        
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Sorry, we couldn't find the page you were looking for.
        </p>
        
        <Button 
          onClick={() => navigate("/dashboard")}
          className="btn-primary"
        >
          Return to Dashboard
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;
