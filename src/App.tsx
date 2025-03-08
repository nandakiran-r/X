import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Flower2, Wind, Sun, Droplets, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import Navbar from './components/Navbar';
import HerbalCard from './components/HerbalCard';
import CircleAnimation from './components/CircleAnimation';
import ProductCard from './components/ProductCard';
import TestimonialCard from './components/TestimonialCard';
import SplashScreen from './components/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (showSplash) {
    return <SplashScreen isVisible={showSplash} onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <CircleAnimation />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-bold text-green-800 mb-6"
          >
            AYUSH India
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-green-700 max-w-2xl mx-auto mb-8"
          >
            Discover the ancient wisdom of Ayurveda for modern wellness
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors flex items-center mx-auto"
          >
            Explore Now <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Features Section */}
      <motion.div 
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeIn}
        className="py-20 px-4 bg-white/80 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <HerbalCard 
            icon={<Leaf className="w-8 h-8 text-green-600" />}
            title="Natural Herbs"
            description="Pure and authentic medicinal herbs sourced from organic farms"
          />
          <HerbalCard 
            icon={<Flower2 className="w-8 h-8 text-purple-600" />}
            title="Traditional Wisdom"
            description="Ancient Ayurvedic practices adapted for modern lifestyle"
          />
          <HerbalCard 
            icon={<Wind className="w-8 h-8 text-blue-600" />}
            title="Holistic Healing"
            description="Balance of body, mind, and spirit through natural remedies"
          />
          <HerbalCard 
            icon={<Sun className="w-8 h-8 text-yellow-600" />}
            title="Daily Wellness"
            description="Integrate Ayurvedic principles into your daily routine"
          />
        </div>
      </motion.div>

      {/* Products Section */}
      <div className="py-20 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-green-800 text-center mb-12"
          >
            Popular Products
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard
              image="https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              title="Organic Ashwagandha"
              price="₹499"
              rating={5}
              description="Premium quality Ashwagandha root powder for stress relief and immunity"
            />
            <ProductCard
              image="https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              title="Tulsi Green Tea"
              price="₹299"
              rating={4}
              description="Blend of holy basil and green tea for natural detoxification"
            />
            <ProductCard
              image="https://images.unsplash.com/photo-1509358271058-acd22cc93898?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              title="Neem Extract"
              price="₹399"
              rating={5}
              description="Pure Neem extract for skin health and natural immunity"
            />
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-green-800 text-center mb-12"
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Priya Sharma"
              role="Yoga Instructor"
              content="The quality of AYUSH products has transformed my daily wellness routine. My students have noticed the difference too!"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            />
            <TestimonialCard
              name="Rajesh Kumar"
              role="Wellness Coach"
              content="As a wellness coach, I highly recommend AYUSH products to all my clients. The results speak for themselves."
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            />
            <TestimonialCard
              name="Anita Patel"
              role="Ayurveda Practitioner"
              content="Finally found a brand that truly understands and respects the principles of Ayurveda. Exceptional quality!"
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            />
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-20 px-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-green-800 mb-8"
          >
            Begin Your Wellness Journey
          </motion.h2>
          <p className="text-lg text-green-700 mb-8">
            Join thousands of others who have discovered the power of Ayurvedic healing
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors"
          >
            Contact Us
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AYUSH India</h3>
            <p className="text-green-200">
              Bringing ancient wisdom to modern wellness through authentic Ayurvedic solutions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-200 hover:text-white">About Us</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Products</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-200 hover:text-white">Herbs</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Supplements</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Oils</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Teas</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-green-200 hover:text-white">Facebook</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Instagram</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-green-200 hover:text-white">LinkedIn</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;