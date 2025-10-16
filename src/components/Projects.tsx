'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Brain, Database, Zap, BarChart3 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { fetchProjects, Project } from '@/lib/projects';
import DataVisualization from './DataVisualization';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetchProjects();
        if (response.success && Array.isArray(response.data)) {
          setProjects(response.data);
        }
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Icon mapping based on category
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'machine learning':
<<<<<<< HEAD
        return <BarChart3 className="w-5 h-5" />;
      case 'data science':
        return <Brain className="w-5 h-5" />;
      case 'deep learning':
        return <Zap className="w-5 h-5" />;
      case 'web development':
        return <Database className="w-5 h-5" />;
      default:
        return <Brain className="w-5 h-5" />;
=======
        return <BarChart3 className="w-6 h-6" />;
      case 'data science':
        return <Brain className="w-6 h-6" />;
      case 'deep learning':
        return <Zap className="w-6 h-6" />;
      case 'web development':
        return <Database className="w-6 h-6" />;
      default:
        return <Brain className="w-6 h-6" />;
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
    }
  };

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

  return (
    <section id="projects" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 hexagon-bg"></div>
      <div className="absolute inset-0 circuit-overlay"></div>
      <DataVisualization type="math-graph" intensity={0.5} />
      
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#00ffff] mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-transparent mx-auto"></div>
        </motion.div>

        {/* Projects Grid - Continuous Layout */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-[#00ffff] text-xl">Loading projects...</div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
<<<<<<< HEAD
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto"
=======
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="group relative"
              >
<<<<<<< HEAD
                <div 
                  className="hud-border bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-[#1a1a1a]/70 transition-all duration-300 neon-card-glow cursor-pointer"
                  onClick={() => {
                    // Redirect to live link if available, otherwise to GitHub
                    if (project.liveLink && project.liveLink.trim() !== '') {
                      window.open(project.liveLink, '_blank', 'noopener,noreferrer');
                    } else if (project.githubLink && project.githubLink.trim() !== '') {
                      window.open(project.githubLink, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  title={`Click to view ${project.liveLink ? 'live demo' : 'GitHub repository'}`}
                >
                  {/* Project Image */}
                  <div className="relative h-28 overflow-hidden">
=======
                <div className="hud-border bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-[#1a1a1a]/70 transition-all duration-300 neon-card-glow">
                  {/* Project Image */}
                  <div className="relative h-40 overflow-hidden">
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/20 to-[#0a0a0a]/60"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[#00ffff] group-hover:scale-110 transition-transform duration-300 neon-icon-glow">
<<<<<<< HEAD
                        <div className="w-5 h-5">
                          {getIcon(project.category)}
                        </div>
=======
                        {getIcon(project.category)}
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
                      </div>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#00ffff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-4">
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-[#0a0a0a]/90 rounded-full text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300 neon-button-glow border border-[#00ffff]/30"
                          title="View on GitHub"
<<<<<<< HEAD
                          onClick={(e) => e.stopPropagation()}
=======
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                        {project.liveLink && (
                          <motion.a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 bg-[#0a0a0a]/90 rounded-full text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300 neon-button-glow border border-[#00ffff]/30"
                            title="View Live Demo"
<<<<<<< HEAD
                            onClick={(e) => e.stopPropagation()}
=======
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
<<<<<<< HEAD
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-base font-semibold text-[#00ffff] group-hover:text-white transition-colors duration-300 neon-text-glow">
                        {project.title}
                      </h3>
                      <div className="text-xs text-[#666666] group-hover:text-[#00ffff] transition-colors duration-300">
                        Click to view
                      </div>
                    </div>
                    
                    <p className="text-[#a0a0a0] mb-2 leading-relaxed text-sm line-clamp-2">
=======
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#00ffff] mb-2 group-hover:text-white transition-colors duration-300 neon-text-glow">
                      {project.title}
                    </h3>
                    
                    <p className="text-[#a0a0a0] mb-3 leading-relaxed text-sm line-clamp-3">
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
                      {project.description}
                    </p>

                    {/* Technology Tags */}
<<<<<<< HEAD
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-full text-xs text-[#00ffff] hover:bg-[#00ffff]/20 transition-colors duration-300 neon-tag-glow"
=======
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-full text-sm text-[#00ffff] hover:bg-[#00ffff]/20 transition-colors duration-300 neon-tag-glow"
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hexagon Corner */}
                  <div className="absolute top-4 right-4 w-8 h-8 border border-[#00ffff]/30 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-[#00ffff] rounded-full pulse-glow"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-[#00ffff] rounded-full pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-[#00ffff] rounded-full pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default Projects;
