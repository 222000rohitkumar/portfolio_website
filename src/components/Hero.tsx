'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import DataVisualization from './DataVisualization';

const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a]/80 via-[#1a1a1a]/60 to-[#0a0a0a]/80"></div>
      </div>
      
      {/* Background Effects */}
      <div className="absolute inset-0 hexagon-bg"></div>
      <div className="absolute inset-0 circuit-overlay"></div>
      <div className="absolute inset-0 grid-animation"></div>
      
      {/* Dynamic Data Visualization */}
      <DataVisualization type="neural" intensity={0.8} />
      
      {/* Floating Data Visualization Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-[#00ffff]/20 rounded-full neon-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 border border-[#0080ff]/20 rounded-full neon-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/3 left-1/3 w-20 h-20 border border-[#00ffff]/20 rounded-full neon-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-[#00ffff] rounded-full pulse-glow"></div>
      <div className="absolute top-40 right-32 w-2 h-2 bg-[#00ffff] rounded-full pulse-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-32 w-3 h-3 bg-[#00ffff] rounded-full pulse-glow" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-[#00ffff] rounded-full pulse-glow" style={{ animationDelay: '0.5s' }}></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#00ffff] via-[#0080ff] to-[#00ffff] bg-clip-text text-transparent neon-text-glow"
          >
            Rohit Kumar
          </motion.h1>

          {/* Sub-headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl md:text-3xl font-medium text-[#a0a0a0] mb-8"
          >
            Data Scientist | AI & Machine Learning Architect
          </motion.h2>

          {/* Introductory Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl text-[#a0a0a0] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            I design and build intelligent systems that solve complex problems, turning data into actionable insights.
          </motion.p>

          {/* Call-to-Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="btn-primary text-lg px-8 py-4 relative group neon-button-glow"
            >
              <span className="relative z-10">View My Projects</span>
              <ChevronDown className="inline-block ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-[#00ffff] cursor-pointer"
            onClick={() => scrollToProjects()}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </motion.div>
      </div>

      {/* Hexagon Decorations */}
      <div className="absolute top-1/4 left-10 w-16 h-16 border border-[#00ffff]/30 rotate-45 pulse-glow"></div>
      <div className="absolute top-1/3 right-10 w-12 h-12 border border-[#00ffff]/30 rotate-45 pulse-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-1/4 left-20 w-8 h-8 border border-[#00ffff]/30 rotate-45 pulse-glow" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default Hero;
