import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  image: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, content, image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-6 rounded-xl shadow-lg relative"
    >
      <Quote className="absolute top-4 right-4 w-8 h-8 text-green-200" />
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-green-800">{name}</h4>
          <p className="text-green-600 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">{content}</p>
    </motion.div>
  );
};

export default TestimonialCard;