'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GALLERY_MOCK } from '../store';
import { Project } from '../types';
import { ExternalLink, Database, Share2 } from 'lucide-react';

const ProjectCard: React.FC<{ project: Project, index: number }> = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group relative bg-black border border-white/10 hover:border-brand-red/50 transition-all duration-300 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 bg-brand-red/10 mix-blend-overlay z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <img 
          src={project.rebornImage} 
          alt={project.name} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur p-2 border-t border-white/10 flex gap-2">
           {project.tags.map(tag => (
             <span key={tag} className="text-[10px] font-mono text-brand-red border border-brand-red/30 px-1.5 py-0.5 uppercase">{tag}</span>
           ))}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">{project.name}</h3>
            <div className="w-2 h-2 bg-brand-red rounded-full shadow-[0_0_5px_#ef4444]"></div>
        </div>
        <p className="text-brand-red text-xs font-mono mb-4">{project.ens}</p>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 font-mono leading-relaxed flex-grow">{project.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
          <div className="flex items-center gap-4 text-gray-600 text-xs font-mono uppercase">
            <button className="flex items-center gap-1 hover:text-white transition-colors">
               <Database size={14} /> {project.votes} Nodes
            </button>
          </div>
          <a href="#" className="flex items-center gap-1 text-white hover:text-brand-red text-xs font-bold uppercase tracking-wider transition-colors">
            Access <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Gallery: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2 uppercase tracking-tight">Archive_Index</h1>
          <p className="text-gray-500 font-mono text-sm max-w-xl">
            Immutable record of resurrected decentralized interfaces.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0 font-mono text-xs uppercase tracking-widest">
          <button className="px-4 py-2 border border-brand-red text-brand-red hover:bg-brand-red hover:text-black transition-colors">Popular</button>
          <button className="px-4 py-2 border border-white/10 text-gray-500 hover:border-white/30 hover:text-white transition-colors">Latest_Entries</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_MOCK.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
        
        {/* Placeholder */}
        <div className="flex items-center justify-center min-h-[300px] border border-dashed border-white/10 hover:border-brand-red/30 transition-colors bg-white/5">
          <p className="font-mono text-xs text-gray-600 uppercase tracking-widest">[ Load_More_Records ]</p>
        </div>
      </div>
    </div>
  );
};