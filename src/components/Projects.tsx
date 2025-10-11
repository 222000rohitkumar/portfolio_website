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
        return <BarChart3 className="w-6 h-6" />;
      case 'data science':
        return <Brain className="w-6 h-6" />;
      case 'deep learning':
        return <Zap className="w-6 h-6" />;
      case 'web development':
        return <Database className="w-6 h-6" />;
      default:
        return <Brain className="w-6 h-6" />;
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                className="group relative"
              >
                <div className="hud-border bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-[#1a1a1a]/70 transition-all duration-300 neon-card-glow">
                  {/* Project Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/20 to-[#0a0a0a]/60"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-[#00ffff] group-hover:scale-110 transition-transform duration-300 neon-icon-glow">
                        {getIcon(project.category)}
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
                          >
                            <ExternalLink className="w-5 h-5" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#00ffff] mb-2 group-hover:text-white transition-colors duration-300 neon-text-glow">
                      {project.title}
                    </h3>
                    
                    <p className="text-[#a0a0a0] mb-3 leading-relaxed text-sm line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-full text-sm text-[#00ffff] hover:bg-[#00ffff]/20 transition-colors duration-300 neon-tag-glow"
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
