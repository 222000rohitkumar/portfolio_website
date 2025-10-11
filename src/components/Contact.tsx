'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Send } from 'lucide-react';
import { useState } from 'react';
import DataVisualization from './DataVisualization';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Portfolio Contact');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    const mailtoLink = `mailto:rvempire007@gmail.com?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
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

  const itemVariants = {
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
    <section id="contact" className="py-20 relative">
      {/* Background Effects */}
      <div className="absolute inset-0 hexagon-bg"></div>
      <div className="absolute inset-0 circuit-overlay"></div>
      <DataVisualization type="database-schema" intensity={0.4} />
      
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
            Initiate Contact
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00ffff] to-transparent mx-auto"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="hud-border bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg p-8 neon-card-glow">
            <h3 className="text-2xl font-semibold text-[#00ffff] mb-6 neon-text-glow">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[#a0a0a0] mb-2 font-medium">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input w-full"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[#a0a0a0] mb-2 font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input w-full"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-[#a0a0a0] mb-2 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input w-full"
                  placeholder="Project Inquiry"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-[#a0a0a0] mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="form-input w-full resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full flex items-center justify-center neon-button-glow"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="hud-border bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg p-8 neon-card-glow">
              <h3 className="text-2xl font-semibold text-[#00ffff] mb-6 neon-text-glow">Direct Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#00ffff]/10 rounded-full">
                    <Mail className="w-6 h-6 text-[#00ffff]" />
                  </div>
                  <div>
                    <p className="text-[#a0a0a0] text-sm">Email</p>
                    <a 
                      href="mailto:rvempire007@gmail.com" 
                      className="text-[#00ffff] hover:text-white transition-colors duration-300"
                    >
                      rvempire007@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-[#00ffff]/10 rounded-full">
                    <Phone className="w-6 h-6 text-[#00ffff]" />
                  </div>
                  <div>
                    <p className="text-[#a0a0a0] text-sm">Phone</p>
                    <a 
                      href="tel:+919122228620" 
                      className="text-[#00ffff] hover:text-white transition-colors duration-300"
                    >
                      +91 9122228620
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="hud-border bg-[#1a1a1a]/50 backdrop-blur-sm rounded-lg p-8 neon-card-glow">
              <h3 className="text-2xl font-semibold text-[#00ffff] mb-6 neon-text-glow">Connect</h3>
              
              <div className="flex space-x-4">
                <motion.a
                  href="https://www.linkedin.com/in/rohit-kumar-70a949267/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-full text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300 neon-button-glow"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
                
                <motion.a
                  href="https://github.com/222000rohitkumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-[#00ffff]/10 border border-[#00ffff]/30 rounded-full text-[#00ffff] hover:bg-[#00ffff] hover:text-[#0a0a0a] transition-all duration-300 neon-button-glow"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-[#00ffff] rounded-full pulse-glow"></div>
        <div className="absolute top-40 right-20 w-2 h-2 bg-[#00ffff] rounded-full pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-[#00ffff] rounded-full pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default Contact;
