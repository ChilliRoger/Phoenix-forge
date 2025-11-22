'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY_MOCK } from '../store';
import { Project } from '../types';
import { ExternalLink, Database, Share2, Filter, Search, TrendingUp, Clock } from 'lucide-react';

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
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'votes' | 'recent'>('votes');

  const filteredProjects = GALLERY_MOCK
    .filter(project => {
      const matchesFilter = filter === 'all' || project.tags.includes(filter.toUpperCase());
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'votes') return (b.votes ?? 0) - (a.votes ?? 0);
      return parseInt(b.lastActive || '0') - parseInt(a.lastActive || '0');
    });

  const allTags = Array.from(new Set(GALLERY_MOCK.flatMap(p => p.tags)));

  return (
    <div className="container mx-auto px-6 py-12 max-w-7xl">
      {/* Header Stats */}
      <div className="mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-black/40 border border-white/10 p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-white font-mono">{GALLERY_MOCK.length}</div>
          <div className="text-gray-500 text-xs uppercase tracking-wider font-mono">Total Archives</div>
        </div>
        <div className="bg-black/40 border border-white/10 p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-brand-red font-mono">100%</div>
          <div className="text-gray-500 text-xs uppercase tracking-wider font-mono">Uptime</div>
        </div>
        <div className="bg-black/40 border border-white/10 p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-white font-mono">{GALLERY_MOCK.reduce((acc, p) => acc + (p.votes ?? 0), 0)}</div>
          <div className="text-gray-500 text-xs uppercase tracking-wider font-mono">Total Nodes</div>
        </div>
        <div className="bg-black/40 border border-white/10 p-4 backdrop-blur-sm">
          <div className="text-3xl font-bold text-white font-mono">24/7</div>
          <div className="text-gray-500 text-xs uppercase tracking-wider font-mono">Monitoring</div>
        </div>
      </div>

      {/* Title and Search */}
      <div className="mb-8 border-b border-white/10 pb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 uppercase tracking-tight font-mono">Archive_Index</h1>
            <p className="text-gray-500 font-mono text-sm max-w-xl">
              Immutable record of resurrected decentralized interfaces.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="flex items-center bg-black border border-white/20 p-2 focus-within:border-brand-red transition-colors w-full md:w-auto">
            <Search size={16} className="text-gray-500 ml-2" />
            <input
              type="text"
              placeholder="Search archives..."
              className="bg-transparent border-none text-white px-3 py-1 focus:ring-0 focus:outline-none text-sm font-mono w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 border text-xs font-mono uppercase tracking-widest transition-colors ${
              filter === 'all' 
                ? 'border-brand-red bg-brand-red/10 text-brand-red' 
                : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
            }`}
          >
            All ({GALLERY_MOCK.length})
          </button>
          {allTags.map(tag => {
            const count = GALLERY_MOCK.filter(p => p.tags.includes(tag)).length;
            return (
              <button 
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-4 py-2 border text-xs font-mono uppercase tracking-widest transition-colors ${
                  filter === tag 
                    ? 'border-brand-red bg-brand-red/10 text-brand-red' 
                    : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
                }`}
              >
                {tag} ({count})
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 font-mono text-xs uppercase tracking-widest">
          <button 
            onClick={() => setSortBy('votes')}
            className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
              sortBy === 'votes'
                ? 'border-brand-red text-brand-red'
                : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
            }`}
          >
            <TrendingUp size={14} /> Popular
          </button>
          <button 
            onClick={() => setSortBy('recent')}
            className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
              sortBy === 'recent'
                ? 'border-brand-red text-brand-red'
                : 'border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
            }`}
          >
            <Clock size={14} /> Recent
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6 text-gray-500 font-mono text-sm">
        Showing {filteredProjects.length} of {GALLERY_MOCK.length} archives
        {searchTerm && ` matching "${searchTerm}"`}
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={filter + searchTerm + sortBy}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
          
          {filteredProjects.length === 0 && (
            <div className="col-span-full flex items-center justify-center min-h-[300px] border border-dashed border-white/10">
              <p className="font-mono text-sm text-gray-600 uppercase tracking-widest">No archives found matching your criteria</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};