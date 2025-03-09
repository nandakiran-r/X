import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const bgImages = ["/images/bg.webp", "/images/bg2.jpeg", "/images/bg3.jpg"];

const Welcome = () => {
  const navigate = useNavigate();
  const [currentBg, setCurrentBg] = useState(0);

  // Auto-slide background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length);
    }, 3000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Check if user has completed onboarding
  useEffect(() => {
    const isOnboarded = localStorage.getItem("sakhi-onboarded");
    if (isOnboarded === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          backgroundImage: `url(${bgImages[currentBg]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Black Overlay */}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-md mx-auto text-center p-8 rounded-2xl shadow-xl bg-white/10 backdrop-blur-md border border-white/20"
      >
        {/* Logo Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-24 h-24 rounded-full bg-gradient-to-br from-sakhi-lavender to-sakhi-pink flex items-center justify-center mx-auto mb-6 shadow-lg overflow-hidden"
        >
          {/* <h1 className="text-2xl font-bold text-white"></h1> */}
          <img src="/images/logo.jpeg" alt="HerSakhi Logo" className="" />
        </motion.div>

        {/* Branding and Tagline */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl font-bold mb-3 text-white"
        >
          Welcome to <span className="text-sakhi-lavender">Her</span>
          <span className="text-sakhi-pink">Sakhi</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg text-white/90 mb-6"
        >
          Your Ayurvedic Companion for Women's Health
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8 px-6 py-3 rounded-lg bg-white/10 mx-auto"
        >
          <p className="text-sm text-white/80">
            Inspired by <strong className="text-sakhi-lavender">AYUSH</strong> –
            Ayurveda, Yoga, Unani, Siddha, and Homeopathy
          </p>
        </motion.div>

        {/* Button and Footer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="space-y-6"
        >
          <Button
            onClick={() => navigate("/onboarding")}
            className="w-full bg-[#ff8f9c] hover:bg-sakhi-pink/90 text-white py-3 px-6 rounded-lg text-lg font-medium shadow-md transition-all duration-300"
          >
            Get Started
          </Button>

          <p className="text-xs text-white/60 mt-8">
            Powered by{" "}
            <span className="text-sakhi-lavender font-semibold">AYUSH</span> |
            Embracing Holistic Healing
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Welcome;
