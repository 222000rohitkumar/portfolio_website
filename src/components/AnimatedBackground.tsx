'use client';

import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      type: 'neural' | 'data' | 'math' | 'database';
      angle: number;
      speed: number;
    }> = [];

    // Create particles
    const createParticles = () => {
      particles.length = 0;
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        const types: Array<'neural' | 'data' | 'math' | 'database'> = ['neural', 'data', 'math', 'database'];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          type: types[Math.floor(Math.random() * types.length)],
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.01
        });
      }
    };

    // Draw neural network connections
    const drawNeuralConnections = () => {
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.1;
            ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Draw different particle types
    const drawParticle = (particle: typeof particles[0]) => {
      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.angle);

      switch (particle.type) {
        case 'neural':
          // Draw neural network node
          ctx.fillStyle = '#00ffff';
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#00ffff';
          ctx.lineWidth = 1;
          ctx.stroke();
          break;
          
        case 'data':
          // Draw data points
          ctx.fillStyle = '#0080ff';
          ctx.beginPath();
          ctx.rect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
          ctx.fill();
          break;
          
        case 'math':
          // Draw mathematical symbols
          ctx.strokeStyle = '#00ffff';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-particle.size, 0);
          ctx.lineTo(particle.size, 0);
          ctx.moveTo(0, -particle.size);
          ctx.lineTo(0, particle.size);
          ctx.stroke();
          break;
          
        case 'database':
          // Draw database cylinders
          ctx.fillStyle = '#0080ff';
          ctx.beginPath();
          ctx.ellipse(0, -particle.size/2, particle.size, particle.size/3, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.ellipse(0, particle.size/2, particle.size, particle.size/3, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#00ffff';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-particle.size, -particle.size/2);
          ctx.lineTo(-particle.size, particle.size/2);
          ctx.moveTo(particle.size, -particle.size/2);
          ctx.lineTo(particle.size, particle.size/2);
          ctx.stroke();
          break;
      }

      ctx.restore();
    };

    // Draw floating equations and formulas
    const drawFloatingText = () => {
      const formulas = ['y = mx + b', 'f(x) = ax² + bx + c', '∑', '∫', '∇', '∂', 'π', 'e', 'log', 'sin', 'cos'];
      const time = Date.now() * 0.001;
      
      ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.font = '12px monospace';
      
      for (let i = 0; i < 5; i++) {
        const x = (Math.sin(time * 0.5 + i) * 100) + canvas.width / 2;
        const y = (Math.cos(time * 0.3 + i) * 50) + canvas.height / 2;
        const formula = formulas[Math.floor(Math.random() * formulas.length)];
        
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.fillText(formula, x, y);
        ctx.restore();
      }
    };

    // Main animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.angle += particle.speed;
        
        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        drawParticle(particle);
      });
      
      // Draw connections
      drawNeuralConnections();
      
      // Draw floating text
      drawFloatingText();
      
      animationId = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default AnimatedBackground;
