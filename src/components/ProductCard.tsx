import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  rating: number;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, rating, description }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-green-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-green-800">{price}</span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;