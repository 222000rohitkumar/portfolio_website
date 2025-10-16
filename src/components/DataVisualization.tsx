'use client';

import { useEffect, useRef, useState } from 'react';

interface DataVisualizationProps {
  type: 'neural' | 'data-flow' | 'math-graph' | 'database-schema';
  intensity?: number;
}

const DataVisualization = ({ type, intensity = 1 }: DataVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation variables
    let animationId: number;
    const time = { current: 0 };

    // Neural Network Visualization
    const drawNeuralNetwork = () => {
      const layers = 4;
      const nodesPerLayer = [3, 5, 4, 2];
      const layerSpacing = canvas.width / (layers + 1);
      const nodeSpacing = canvas.height / 6;

      // Draw connections
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * intensity})`;
      ctx.lineWidth = 1;

      for (let layer = 0; layer < layers - 1; layer++) {
        const currentLayerNodes = nodesPerLayer[layer];
        const nextLayerNodes = nodesPerLayer[layer + 1];
        
        for (let i = 0; i < currentLayerNodes; i++) {
          for (let j = 0; j < nextLayerNodes; j++) {
            const x1 = layerSpacing * (layer + 1);
            const y1 = nodeSpacing * (i + 1);
            const x2 = layerSpacing * (layer + 2);
            const y2 = nodeSpacing * (j + 1);
            
            const pulse = Math.sin(time.current * 2 + i + j) * 0.5 + 0.5;
            ctx.globalAlpha = pulse * 0.1 * intensity;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let layer = 0; layer < layers; layer++) {
        const nodes = nodesPerLayer[layer];
        const x = layerSpacing * (layer + 1);
        
        for (let i = 0; i < nodes; i++) {
          const y = nodeSpacing * (i + 1);
          const pulse = Math.sin(time.current * 3 + i + layer) * 0.5 + 0.5;
          
          ctx.fillStyle = `rgba(0, 255, 255, ${pulse * 0.3 * intensity})`;
          ctx.beginPath();
          ctx.arc(x, y, 4 + pulse * 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Data Flow Visualization
    const drawDataFlow = () => {
      const points = 8;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 3;

      // Draw data flow lines
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2 + time.current;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        const nextAngle = ((i + 1) / points) * Math.PI * 2 + time.current;
        const nextX = centerX + Math.cos(nextAngle) * radius;
        const nextY = centerY + Math.sin(nextAngle) * radius;

        const pulse = Math.sin(time.current * 2 + i) * 0.5 + 0.5;
        ctx.strokeStyle = `rgba(0, 128, 255, ${pulse * 0.2 * intensity})`;
        ctx.lineWidth = 2;
        ctx.globalAlpha = pulse * 0.3 * intensity;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();

        // Draw data points
        ctx.fillStyle = `rgba(0, 255, 255, ${pulse * 0.4 * intensity})`;
        ctx.beginPath();
        ctx.arc(x, y, 3 + pulse, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Mathematical Graph Visualization
    const drawMathGraph = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const amplitude = 50 * intensity;
      const frequency = 0.02;

      // Draw sine wave
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 * intensity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (let x = 0; x < canvas.width; x += 2) {
        const y = centerY + Math.sin(x * frequency + time.current * 2) * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw cosine wave
      ctx.strokeStyle = `rgba(0, 128, 255, ${0.3 * intensity})`;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 2) {
        const y = centerY + Math.cos(x * frequency + time.current * 2) * amplitude * 0.7;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Draw grid
      ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * intensity})`;
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Database Schema Visualization
    const drawDatabaseSchema = () => {
      const tables = 3;
      const tableWidth = 80;
      const tableHeight = 60;
      const spacing = (canvas.width - tables * tableWidth) / (tables + 1);

      for (let i = 0; i < tables; i++) {
        const x = spacing + i * (tableWidth + spacing);
        const y = canvas.height / 2 - tableHeight / 2;
        
        const pulse = Math.sin(time.current * 1.5 + i) * 0.5 + 0.5;
        
        // Draw table
        ctx.strokeStyle = `rgba(0, 255, 255, ${0.4 * intensity})`;
        ctx.fillStyle = `rgba(0, 255, 255, ${pulse * 0.1 * intensity})`;
        ctx.lineWidth = 2;
        
        ctx.fillRect(x, y, tableWidth, tableHeight);
        ctx.strokeRect(x, y, tableWidth, tableHeight);
        
        // Draw table name
        ctx.fillStyle = `rgba(0, 255, 255, ${0.6 * intensity})`;
        ctx.font = '10px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`Table ${i + 1}`, x + tableWidth / 2, y + 15);
        
        // Draw columns
        for (let j = 0; j < 3; j++) {
          const colY = y + 25 + j * 10;
          ctx.fillStyle = `rgba(0, 128, 255, ${0.4 * intensity})`;
          ctx.fillText(`col${j + 1}`, x + tableWidth / 2, colY);
        }
        
        // Draw connections between tables
        if (i < tables - 1) {
          const nextX = spacing + (i + 1) * (tableWidth + spacing);
          ctx.strokeStyle = `rgba(0, 255, 255, ${pulse * 0.2 * intensity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(x + tableWidth, y + tableHeight / 2);
          ctx.lineTo(nextX, y + tableHeight / 2);
          ctx.stroke();
        }
      }
    };

    // Main animation loop
    const animate = () => {
      if (!isVisible) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time.current += 0.016; // ~60fps

      switch (type) {
        case 'neural':
          drawNeuralNetwork();
          break;
        case 'data-flow':
          drawDataFlow();
          break;
        case 'math-graph':
          drawMathGraph();
          break;
        case 'database-schema':
          drawDatabaseSchema();
          break;
      }

      animationId = requestAnimationFrame(animate);
    };

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    if (isVisible) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, [type, intensity, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default DataVisualization;
