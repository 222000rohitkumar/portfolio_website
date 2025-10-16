'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#333333]' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-[#00ffff] cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            Rohit Kumar
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: 'Home', id: 'home' },
              { name: 'Skills', id: 'skills' },
              { name: 'Projects', id: 'projects' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className="text-[#a0a0a0] hover:text-[#00ffff] transition-colors duration-300 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00ffff] transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
<<<<<<< HEAD
            <motion.a
              href="/admin"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-[#a0a0a0] hover:text-[#00ffff] transition-colors duration-300 font-medium relative group"
            >
              Admin
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00ffff] transition-all duration-300 group-hover:w-full"></span>
            </motion.a>
=======
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-[#00ffff] p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
