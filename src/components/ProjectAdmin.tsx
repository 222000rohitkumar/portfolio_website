'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { fetchProjects, createProject, updateProject, deleteProject, Project } from '@/lib/projects';
<<<<<<< HEAD
import PasswordModal from './PasswordModal';
=======
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5

const ProjectAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
<<<<<<< HEAD
    category: '',
    image: ''
  });
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
=======
    category: ''
  });
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5

  useEffect(() => {
    loadProjects();
  }, []);

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

<<<<<<< HEAD
  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setFormData(prev => ({ ...prev, image: result.data.url }));
        return result.data.url;
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image. Please try again.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = formData.image;
    
    // Upload file if a new file is selected
    if (selectedFile) {
      const uploadedUrl = await handleFileUpload(selectedFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        return; // Stop if upload failed
      }
    }
    
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
      image: imageUrl || '/api/placeholder/400/300'
=======
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      technologies: formData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
      image: '/api/placeholder/400/300'
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectData);
      } else {
        await createProject(projectData);
      }
      
      await loadProjects();
      resetForm();
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      githubLink: project.githubLink,
      liveLink: project.liveLink,
<<<<<<< HEAD
      category: project.category,
      image: project.image
    });
    setSelectedFile(null);
    setShowForm(true);
  };

  const handleDelete = (project: Project) => {
    setProjectToDelete(project);
    setShowPasswordModal(true);
  };

  const confirmDelete = async (password: string) => {
    if (!projectToDelete) return;

    try {
      await deleteProject(projectToDelete.id);
      await loadProjects();
      setProjectToDelete(null);
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const cancelDelete = () => {
    setProjectToDelete(null);
    setShowPasswordModal(false);
  };

=======
      category: project.category
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        await loadProjects();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      githubLink: '',
      liveLink: '',
<<<<<<< HEAD
      category: '',
      image: ''
    });
    setSelectedFile(null);
=======
      category: ''
    });
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
    setEditingProject(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-[#00ffff] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#00ffff]">Project Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </motion.button>
      </div>

      {/* Project Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="hud-border bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#00ffff]">
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            <button
              onClick={resetForm}
              className="text-[#a0a0a0] hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#a0a0a0] mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-[#a0a0a0] mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-input w-full"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Machine Learning">Machine Learning</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Deep Learning">Deep Learning</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#a0a0a0] mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="form-input w-full"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-[#a0a0a0] mb-2">Technologies (comma-separated)</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="form-input w-full"
                placeholder="Python, Machine Learning, Data Analysis"
                required
              />
            </div>

<<<<<<< HEAD
            <div>
              <label className="block text-[#a0a0a0] mb-2">Project Image</label>
              <div className="space-y-4">
                {formData.image && (
                  <div className="relative">
                    <img 
                      src={formData.image} 
                      alt="Project preview" 
                      className="w-full h-40 object-cover rounded-lg border border-[#00ffff]/30"
                    />
                    <div className="absolute top-2 right-2 bg-[#0a0a0a]/80 text-[#00ffff] px-2 py-1 rounded text-sm">
                      Current Image
                    </div>
                  </div>
                )}
                <div className="border-2 border-dashed border-[#00ffff]/30 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                        // Create preview URL
                        const previewUrl = URL.createObjectURL(file);
                        setFormData(prev => ({ ...prev, image: previewUrl }));
                      }
                    }}
                    className="hidden"
                    id="image-upload"
                  />
                  <label 
                    htmlFor="image-upload" 
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    <div className="w-12 h-12 bg-[#00ffff]/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#00ffff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="text-[#a0a0a0]">
                      <span className="text-[#00ffff]">Click to upload</span> or drag and drop
                    </div>
                    <div className="text-sm text-[#666666]">
                      PNG, JPG, GIF up to 5MB
                    </div>
                  </label>
                </div>
                {selectedFile && (
                  <div className="text-sm text-[#00ffff]">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
                {uploading && (
                  <div className="text-sm text-[#00ffff] flex items-center space-x-2">
                    <div className="animate-spin w-4 h-4 border-2 border-[#00ffff] border-t-transparent rounded-full"></div>
                    <span>Uploading...</span>
                  </div>
                )}
              </div>
            </div>

=======
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[#a0a0a0] mb-2">GitHub Link</label>
                <input
                  type="url"
                  value={formData.githubLink}
                  onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })}
                  className="form-input w-full"
                />
              </div>
              <div>
                <label className="block text-[#a0a0a0] mb-2">Live Link</label>
                <input
                  type="url"
                  value={formData.liveLink}
                  onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                  className="form-input w-full"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{editingProject ? 'Update' : 'Create'}</span>
              </motion.button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 bg-[#333333] text-[#a0a0a0] rounded-lg hover:bg-[#444444] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Projects List */}
<<<<<<< HEAD
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
=======
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
<<<<<<< HEAD
            className="hud-border bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg p-4"
          >
            <h3 className="text-base font-semibold text-[#00ffff] mb-1">{project.title}</h3>
            <p className="text-[#a0a0a0] text-sm mb-2 line-clamp-2">{project.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-3">
=======
            className="hud-border bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-[#00ffff] mb-2">{project.title}</h3>
            <p className="text-[#a0a0a0] text-sm mb-4 line-clamp-3">{project.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-[#00ffff]/10 border border-[#00ffff]/30 rounded text-xs text-[#00ffff]"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="px-2 py-1 bg-[#333333] rounded text-xs text-[#a0a0a0]">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleEdit(project)}
                className="flex-1 px-3 py-2 bg-[#00ffff]/10 border border-[#00ffff]/30 rounded text-[#00ffff] hover:bg-[#00ffff]/20 transition-colors flex items-center justify-center space-x-1"
              >
                <Edit className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
<<<<<<< HEAD
                onClick={() => handleDelete(project)}
                className="px-3 py-2 bg-red-500/10 border border-red-500/30 rounded text-red-400 hover:bg-red-500/20 transition-colors"
                title="Delete project (requires password)"
=======
                onClick={() => handleDelete(project.id)}
                className="px-3 py-2 bg-red-500/10 border border-red-500/30 rounded text-red-400 hover:bg-red-500/20 transition-colors"
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
<<<<<<< HEAD

      {/* Password Modal */}
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.title}"? This action cannot be undone.`}
      />
=======
>>>>>>> 9beead1279eacc1a70aa6fc2ab5f9c5a83f89bc5
    </div>
  );
};

export default ProjectAdmin;
