import React from 'react';
import { Heart, Leaf, Cog as Yoga, Flower2, ScrollText, ArrowRight, Users, Phone } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <span className="text-2xl font-bold text-green-800">AYUSH</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-green-600">About</a>
              <a href="#services" className="text-gray-600 hover:text-green-600">Services</a>
              <a href="#hersakhi" className="text-gray-600 hover:text-green-600">HerSakhi</a>
              <a href="#contact" className="text-gray-600 hover:text-green-600">Contact</a>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-6 pt-20 pb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Holistic Healing Through Ancient Wisdom
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover the power of traditional Indian medicine systems with AYUSH - 
                integrating Ayurveda, Yoga, Unani, Siddha, and Homoeopathy for complete wellness.
              </p>
              <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold 
                hover:bg-green-700 transition duration-300 flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b"
                alt="Meditation and Wellness"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </header>

      {/* HerSakhi Initiative Section */}
      <section id="hersakhi" className="py-20 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-pink-500" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">HerSakhi Initiative</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering women through holistic healthcare and wellness support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Users className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community Support</h3>
              <p className="text-gray-600">Connect with other women and share your wellness journey</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <ScrollText className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Expert Guidance</h3>
              <p className="text-gray-600">Access to qualified AYUSH practitioners and resources</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <Flower2 className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Holistic Care</h3>
              <p className="text-gray-600">Comprehensive wellness programs tailored for women</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1614485376769-c5ffa84f8363"
                alt="Ayurvedic Treatment"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Healing Traditions</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Ayurveda</h3>
                    <p className="text-gray-600">Ancient healing wisdom for mind, body, and spirit balance</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Yoga className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Yoga & Naturopathy</h3>
                    <p className="text-gray-600">Natural healing through yoga and lifestyle modifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-green-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Phone className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-4xl font-bold mb-4">Connect With Us</h2>
            <p className="text-xl opacity-90">Start your wellness journey today</p>
          </div>
          <div className="max-w-lg mx-auto">
            <button className="w-full bg-white text-green-900 py-3 rounded-full font-semibold 
              hover:bg-green-100 transition duration-300">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-950 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Leaf className="h-6 w-6" />
              <span className="text-xl font-bold">AYUSH</span>
            </div>
            <div className="text-sm opacity-75">
              © 2024 AYUSH. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;