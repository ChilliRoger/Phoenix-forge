'use client';

import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let animationId: number;

    // Configuration
    const particleCount = 800; // High density for fluid look
    const particleSpeed = 2;
    const noiseScale = 0.003; // Controls the "zoom" of the noise pattern
    const timeScale = 0.0005; // Controls how fast the pattern evolves
    
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
      size: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = 0;
        this.vy = 0;
        this.maxLife = Math.random() * 100 + 100;
        this.life = this.maxLife;
        this.size = Math.random() * 1.5 + 0.5;
        
        // Brand Red Palette: predominantly red with variations in brightness/alpha
        const alpha = Math.random() * 0.6 + 0.2;
        // Occasional bright white/orange accents for "hot" data
        if (Math.random() > 0.95) {
             this.color = `rgba(255, 200, 200, ${alpha})`;
        } else {
             this.color = `rgba(239, 68, 68, ${alpha})`;
        }
      }

      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.life = this.maxLife;
        this.vx = 0;
        this.vy = 0;
      }

      update(time: number) {
        // Pseudo-Noise Field Calculation
        // Using cos/sin combination to create swirling vectors
        const noiseVal = (Math.cos(this.x * noiseScale) + Math.sin(this.y * noiseScale + time)) * Math.PI;
        
        // Desired velocity vector based on noise
        const dx = Math.cos(noiseVal);
        const dy = Math.sin(noiseVal);

        // Accelerate towards desired direction (Fluid inertia)
        this.vx += (dx * particleSpeed - this.vx) * 0.1;
        this.vy += (dy * particleSpeed - this.vy) * 0.1;

        // Mouse Repulsion Physics
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const distX = this.x - mx;
        const distY = this.y - my;
        const distance = Math.sqrt(distX * distX + distY * distY);
        const repulseRadius = 200;

        if (distance < repulseRadius) {
            const force = (repulseRadius - distance) / repulseRadius;
            const angle = Math.atan2(distY, distX);
            this.vx += Math.cos(angle) * force * 2;
            this.vy += Math.sin(angle) * force * 2;
        }

        // Apply movement
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        // Boundary / Life checks
        if (this.life <= 0 || this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    // Initialize Swarm
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let time = 0;

    const animate = () => {
      // Trail Effect: Draw semi-transparent background instead of clearing
      // This creates the "long exposure" look
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)'; 
      ctx.fillRect(0, 0, w, h);

      particles.forEach(p => {
        p.update(time);
        p.draw();
      });

      time += timeScale;
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};