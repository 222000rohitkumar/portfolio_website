'use client';

import { motion } from 'framer-motion';
import { Github, ExternalLink, Plus, Upload, Edit, Trash2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubLink: string;
  liveLink: string;
  createdAt: string;
}

const DynamicProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    githubLink: '',
    liveLink: ''
  });

  // Load projects from localStorage on component mount
  useEffect(() => {
    const savedProjects = localStorage.getItem('portfolio-projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  }, []);

  // Save projects to localStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('portfolio-projects', JSON.stringify(projects));
  }, [projects]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProject: Project = {
      id: editingProject?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      image: formData.image,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
      githubLink: formData.githubLink,
      liveLink: formData.liveLink,
      createdAt: editingProject?.createdAt || new Date().toISOString()
    };

    if (editingProject) {
      setProjects(prev => prev.map(project => 
        project.id === editingProject.id ? newProject : project
      ));
      setEditingProject(null);
    } else {
      setProjects(prev => [...prev, newProject]);
    }

    // Reset form
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: '',
      githubLink: '',
      liveLink: ''
    });
    setIsAddingProject(false);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(', '),
      githubLink: project.githubLink,
      liveLink: project.liveLink
    });
    setIsAddingProject(true);
  };

  const handleDelete = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(project => project.id !== projectId));
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
    <section id="dynamic-projects" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 hexagon-bg"></div>
      <div className="absolute inset-0 circuit-overlay"></div>
      
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
            Dynamic Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-transparent mx-auto mb-8"></div>
          
          {/* Add Project Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAddingProject(true)}
            className="btn-primary flex items-center mx-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Project
          </motion.button>
        </motion.div>

        {/* Add/Edit Project Form */}
        {isAddingProject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hud-border bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg p-8 mb-12"
          >
            <h3 className="text-2xl font-semibold text-[#00ffff] mb-6">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#a0a0a0] mb-2 font-medium">Project Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input w-full"
                    placeholder="Enter project title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[#a0a0a0] mb-2 font-medium">Technologies (comma separated)</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    className="form-input w-full"
                    placeholder="Python, React, TensorFlow"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[#a0a0a0] mb-2 font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="form-input w-full resize-none"
                  placeholder="Describe your project..."
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#a0a0a0] mb-2 font-medium">GitHub Link</label>
                  <input
                    type="url"
                    name="githubLink"
                    value={formData.githubLink}
                    onChange={handleInputChange}
                    className="form-input w-full"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div>
                  <label className="block text-[#a0a0a0] mb-2 font-medium">Live Demo Link</label>
                  <input
                    type="url"
                    name="liveLink"
                    value={formData.liveLink}
                    onChange={handleInputChange}
                    className="form-input w-full"
                    placeholder="https://your-project.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[#a0a0a0] mb-2 font-medium">Project Image</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="form-input flex-1"
                  />
                  {formData.image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#333333]">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary flex items-center"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {editingProject ? 'Update Project' : 'Add Project'}
                </motion.button>
                
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setIsAddingProject(false);
                    setEditingProject(null);
                    setFormData({
                      title: '',
                      description: '',
                      image: '',
                      technologies: '',
                      githubLink: '',
                      liveLink: ''
                    });
                  }}
                  className="px-6 py-3 bg-[#333333] border border-[#333333] text-[#a0a0a0] rounded-lg hover:bg-[#444444] transition-colors duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="group relative"
            >
              <div className="hud-border bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-[#1a1a1a]/70 transition-all duration-300">
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-[#00ffff]/20 to-[#0a0a0a] overflow-hidden">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00ffff]/10 to-transparent"></div>
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#00ffff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-4">
                      {project.githubLink && (
                        <motion.a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-[#0a0a0a]/80 rounded-full text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300"
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      )}
                      {project.liveLink && (
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-3 bg-[#0a0a0a]/80 rounded-full text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  
                  {/* Admin Controls */}
                  <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEdit(project)}
                      className="p-2 bg-[#0a0a0a]/80 rounded-full text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(project.id)}
                      className="p-2 bg-[#0a0a0a]/80 rounded-full text-red-400 hover:bg-red-400 hover:text-[#0a0a0a] transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#00ffff] mb-3 group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-[#a0a0a0] mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-full text-sm text-[#00ffff] hover:bg-[#00ffff]/20 transition-colors duration-300"
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

        {/* Empty State */}
        {projects.length === 0 && !isAddingProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Eye className="w-16 h-16 text-[#a0a0a0] mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-[#a0a0a0] mb-2">No Projects Yet</h3>
            <p className="text-[#808080] mb-6">Start by adding your first project to showcase your work.</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingProject(true)}
              className="btn-primary flex items-center mx-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Your First Project
            </motion.button>
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

export default DynamicProjects;
