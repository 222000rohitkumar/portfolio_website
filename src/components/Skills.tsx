'use client';

import { motion } from 'framer-motion';
import { Database, Brain, Cpu, Users, MessageSquare, Zap, Target, BarChart3, Network, Code2, FileText, GitBranch, Layers, Activity } from 'lucide-react';
import DataVisualization from './DataVisualization';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code2 className="w-6 h-6" />,
      skills: [
        { name: 'SQL', icon: <Database className="w-5 h-5" />, image: '/images/sql-icon.png' },
        { name: 'Python', icon: <Code2 className="w-5 h-5" />, image: '/images/python-icon.png' },
        { name: 'R', icon: <FileText className="w-5 h-5" />, image: '/images/r-icon.png' }
      ]
    },
    {
      title: 'ML Skills',
      icon: <Brain className="w-6 h-6" />,
      skills: [
        { name: 'Classification', icon: <Target className="w-5 h-5" />, image: '/images/classification-icon.png' },
        { name: 'Regression', icon: <BarChart3 className="w-5 h-5" />, image: '/images/regression-icon.png' },
        { name: 'Clustering', icon: <Network className="w-5 h-5" />, image: '/images/clustering-icon.png' }
      ]
    },
    {
      title: 'Deep Learning & NLP',
      icon: <Cpu className="w-6 h-6" />,
      skills: [
        { name: 'Deep Learning', icon: <Brain className="w-5 h-5" />, image: '/images/deep-learning-icon.png' },
        { name: 'Natural Language Processing', icon: <MessageSquare className="w-5 h-5" />, image: '/images/nlp-icon.png' },
        { name: 'Transformers', icon: <Zap className="w-5 h-5" />, image: '/images/transformers-icon.png' }
      ]
    },
    {
      title: 'Professional Skills',
      icon: <Users className="w-6 h-6" />,
      skills: [
        { name: 'Leadership', icon: <Users className="w-5 h-5" />, image: '/images/leadership-icon.png' },
        { name: 'Communication', icon: <MessageSquare className="w-5 h-5" />, image: '/images/communication-icon.png' },
        { name: 'Project Management', icon: <GitBranch className="w-5 h-5" />, image: '/images/project-management-icon.png' }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 circuit-overlay"></div>
      <DataVisualization type="data-flow" intensity={0.6} />
      
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#00ffff] mb-4 neon-text-glow">
            Technical Arsenal
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-transparent mx-auto"></div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={cardVariants}
              className="hud-border bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg p-6 hover:bg-[#1a1a1a]/70 transition-all duration-300 group neon-card-glow"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6 text-[#00ffff] group-hover:text-[#00ffff] transition-colors duration-300">
                <div className="neon-icon-glow">{category.icon}</div>
                <h3 className="text-xl font-semibold ml-3 neon-text-glow">{category.title}</h3>
              </div>

              {/* Skills List */}
              <motion.div
                variants={containerVariants}
                className="space-y-4"
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    variants={skillVariants}
                    className="flex items-center text-[#a0a0a0] group-hover:text-white transition-colors duration-300"
                  >
                    <div className="text-[#00ffff] mr-3 group-hover:scale-110 transition-transform duration-300 neon-icon-glow">
                      {skill.icon}
                    </div>
                    <span className="font-medium">{skill.name}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Hexagon Decoration */}
              <div className="absolute top-4 right-4 w-8 h-8 border border-[#00ffff]/30 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-[#00ffff] rounded-full pulse-glow"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-[#00ffff] rounded-full pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-[#00ffff] rounded-full pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default Skills;
