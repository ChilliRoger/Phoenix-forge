'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Toaster } from '@/components/ui/Toaster';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen relative text-gray-200 font-mono selection:bg-brand-red/30">
      <ParticleBackground />
      
      {/* Main Content */}
      <motion.div 
        className="relative z-10 flex flex-col min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-sm py-8 text-center text-gray-500 text-xs font-mono uppercase tracking-widest">
          <p>System Status: Operational • PhoenixForge &copy; 2024</p>
        </footer>
      </motion.div>
      
      <Toaster />
    </div>
  );
}
