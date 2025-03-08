import React from 'react';
import { motion } from 'framer-motion';

interface HerbalCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const HerbalCard: React.FC<HerbalCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
      <p className="text-green-600">{description}</p>
    </motion.div>
  );
};

export default HerbalCard;