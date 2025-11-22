'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Shield, Globe } from 'lucide-react';
import { PhoenixLogo } from './PhoenixLogo';

interface LoadingScreenProps {
  onComplete: () => void;
}

const bootLines = [
  { text: "INITIALIZING BIOS...", status: "OK", delay: 0 },
  { text: "CHECKING MEMORY INTEGRITY...", status: "OK", delay: 300 },
  { text: "LOADING KERNEL MODULES...", status: "DONE", delay: 700 },
  { text: "MOUNTING ENCRYPTED FS...", status: "MOUNTED", delay: 1200 },
  { text: "ESTABLISHING P2P HANDSHAKE...", status: "CONNECTED", delay: 1800 },
  { text: "SYNCING WITH IPFS SWARM...", status: "SYNCED", delay: 2400 },
  { text: "STARTING PHOENIX PROTOCOL...", status: "READY", delay: 3100 },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<typeof bootLines>([]);

  useEffect(() => {
    // Progress bar simulation with variable speed
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 600); // Slight pause at 100%
          return 100;
        }
        const increment = Math.random() * 8; // Random increments for realism
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    // Reveal boot lines sequentially
    bootLines.forEach((line) => {
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
      }, line.delay);
    });
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono overflow-hidden"
      exit={{ 
        opacity: 0, 
        y: -50,
        filter: "blur(10px)", 
        transition: { duration: 0.8, ease: "easeInOut" } 
      }}
    >
      {/* CRT Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-60" />
      
      {/* Central HUD */}
      <div className="z-10 w-full max-w-2xl p-8 relative flex flex-col items-center">
        
        {/* Logo / Loader */}
        <div className="relative mb-12">
           {/* Spinning Rings */}
           <div className="absolute inset-0 -m-4 border border-brand-red/20 rounded-full animate-spin-slow"></div>
           <div className="absolute inset-0 -m-8 border border-dashed border-brand-red/10 rounded-full animate-[spin_6s_linear_infinite_reverse]"></div>
           
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.5 }}
             className="w-32 h-32 bg-black/50 border border-brand-red/30 rounded-full flex items-center justify-center relative shadow-[0_0_50px_rgba(239,68,68,0.2)] backdrop-blur-sm"
           >
             <PhoenixLogo className="w-20 h-20 text-brand-red" animated={true} />
           </motion.div>
        </div>

        {/* Title */}
        <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tighter mb-2">
              PHOENIX_FORGE
            </h1>
            <div className="flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
                <span className="text-brand-red text-xs uppercase tracking-[0.3em]">System Initialization</span>
                <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
            </div>
        </div>

        {/* Terminal Log Area */}
        <div className="w-full bg-black/80 border border-white/10 p-4 rounded min-h-[180px] mb-8 font-mono text-xs md:text-sm shadow-2xl backdrop-blur-md relative overflow-hidden">
           {/* Green Scanline Overlay */}
           <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-gradient-to-b from-transparent via-brand-red/5 to-transparent animate-scan z-20" />
           
           <div className="flex flex-col gap-1.5 relative z-10">
             {lines.map((line, idx) => (
               <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-1 last:border-0">
                 <span className="text-gray-400"><span className="text-brand-red mr-2">{'>'}</span>{line.text}</span>
                 <span className={line.status === 'READY' ? "text-brand-red font-bold" : "text-green-500"}>
                    [{line.status}]
                 </span>
               </div>
             ))}
             <div className="text-brand-red animate-pulse mt-1">_</div>
           </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full relative group">
            <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-500 mb-2">
                <span className="group-hover:text-brand-red transition-colors">Loading Core Modules</span>
                <span className="text-white">{Math.floor(progress)}%</span>
            </div>
            <div className="h-1 w-full bg-gray-900 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                    className="h-full bg-brand-red shadow-[0_0_15px_#ef4444]"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>

      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 text-[10px] text-gray-600 font-mono hidden md:block">
         <div className="flex items-center gap-2"><Cpu size={12} /> CPU_LOAD: 34%</div>
         <div className="flex items-center gap-2 mt-2"><Shield size={12} /> FIREWALL: ACTIVE</div>
      </div>
      
      <div className="absolute bottom-8 right-8 text-[10px] text-gray-600 font-mono text-right hidden md:block">
         <div className="flex items-center gap-2 justify-end">NET_STATUS: ONLINE <Globe size={12} /></div>
         <div className="mt-2">VER. 2.1.0 BUILD 9942</div>
      </div>
      
      <div className="absolute bottom-8 left-8 text-[10px] text-brand-red/50 font-mono hidden md:block animate-pulse">
         // UNAUTHORIZED ACCESS PROHIBITED
      </div>

    </motion.div>
  );
};