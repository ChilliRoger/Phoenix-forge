'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Activity, AlertTriangle, Database, Cloud, Lock, Cpu, Search, FileCode, Upload, ArrowDown, ShieldCheck, Zap } from 'lucide-react';
import clsx from 'clsx';
import { LiveStats } from '../components/LiveStats';
import { FeatureShowcase } from '../components/FeatureShowcase';

// Animation variants for scroll reveals
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const SectionHeader: React.FC<{ title: string; subtitle: string; align?: 'left' | 'center' }> = ({ title, subtitle, align = 'left' }) => (
  <div className={clsx("mb-12", align === 'center' && "text-center")}>
    <div className={clsx("inline-block px-2 py-1 bg-brand-red/10 border border-brand-red/30 text-brand-red text-[10px] font-mono uppercase tracking-[0.2em] mb-3", align === 'center' && "mx-auto")}>
      {subtitle}
    </div>
    <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight font-mono leading-tight">
      {title}
    </h2>
  </div>
);

// --- NEW GRAPH COMPONENTS ---

const TechNode: React.FC<{
  step: string;
  label: string;
  icon: any;
  isActive: boolean;
  isCompleted: boolean;
}> = ({ step, label, icon: Icon, isActive, isCompleted }) => {
  return (
    <div className="relative flex flex-col items-center z-10 group">
      {/* Pulse Ring (Active) */}
      {isActive && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-red/20 rounded-full blur-xl animate-pulse pointer-events-none"></div>
      )}

      {/* Node Shape */}
      <div 
        className={clsx(
          "w-24 h-24 md:w-28 md:h-28 relative flex items-center justify-center transition-all duration-500 backdrop-blur-md",
           isActive ? "scale-110" : "scale-100 hover:scale-105"
        )}
      >
        {/* Hexagonal/Tech Border SVG */}
        <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100">
            <defs>
               <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
               </filter>
            </defs>
            
            {/* Outer Shape */}
            <path 
                d="M15,0 L85,0 L100,15 L100,85 L85,100 L15,100 L0,85 L0,15 Z" 
                fill="black" 
                stroke={isActive ? "#ef4444" : (isCompleted ? "#fff" : "#333")}
                strokeWidth={isActive ? "2" : "1"}
                className="transition-colors duration-500"
                filter={isActive ? "url(#glow)" : ""}
            />
            
            {/* Inner Tech Detail Lines */}
            <path 
                d="M15,5 L85,5 M95,15 L95,85 M85,95 L15,95 M5,85 L5,15" 
                fill="none" 
                stroke={isActive ? "#ef4444" : "rgba(255,255,255,0.1)"} 
                strokeWidth="1"
                opacity={isActive ? 0.5 : 1}
            />

            {/* Corner Markers */}
            <path d="M0,20 L0,15 L15,0 L20,0" fill="none" stroke={isActive ? "#ef4444" : "transparent"} strokeWidth="2" />
            <path d="M80,100 L85,100 L100,85 L100,80" fill="none" stroke={isActive ? "#ef4444" : "transparent"} strokeWidth="2" />
        </svg>

        {/* Inner Icon */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div className={clsx(
                "p-3 rounded-lg mb-2 transition-all duration-500 border",
                isActive ? "bg-brand-red/10 border-brand-red/50 text-brand-red" : (isCompleted ? "bg-white/5 border-white/20 text-white" : "bg-transparent border-transparent text-gray-600")
            )}>
                <Icon size={28} />
            </div>
            <div className={clsx(
                "text-[9px] font-mono font-bold tracking-wider uppercase",
                isActive ? "text-brand-red animate-pulse" : "text-gray-600"
            )}>
                {isActive ? "Processing" : (isCompleted ? "Done" : "Pending")}
            </div>
        </div>
      </div>

      {/* Label Section */}
      <div className="mt-6 text-center space-y-1">
        <div className={clsx(
             "text-[10px] font-mono tracking-widest uppercase transition-colors duration-300",
             isActive ? "text-brand-red" : "text-gray-600"
        )}>
             0{step}
        </div>
        <div className={clsx(
            "text-sm font-bold uppercase tracking-wide transition-colors duration-300",
             isActive ? "text-white" : "text-gray-500"
        )}>
            {label}
        </div>
      </div>
    </div>
  );
};

const DataStream: React.FC<{ active: boolean }> = ({ active }) => {
    return (
        <div className="hidden md:flex flex-1 h-px bg-gray-800 relative overflow-hidden mx-4 self-center z-0 -mt-12">
            {/* Static grid line */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50" />
            
            {/* Moving Data Packet */}
            {active && (
                <motion.div 
                    className="absolute top-0 left-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-brand-red to-transparent shadow-[0_0_15px_#ef4444]"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
                />
            )}

            {/* Arrow head for direction */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-800">
               <svg width="6" height="10" viewBox="0 0 6 10" fill="currentColor">
                  <path d="M0 0L6 5L0 10V0Z" />
               </svg>
            </div>
        </div>
    )
}

const OperationalWorkflow: React.FC = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep(prev => (prev + 1) % 5); // Cycle 0-3, then 4 is a momentary pause
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const steps = [
        { id: '1', label: 'Scan Target', icon: Search },
        { id: '2', label: 'Extract Assets', icon: FileCode },
        { id: '3', label: 'Rebuild App', icon: Cpu },
        { id: '4', label: 'Pin to IPFS', icon: Upload },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto mt-16 px-4">
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-12 md:gap-0 relative">
                {/* Mobile connecting line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-800 md:hidden -translate-x-1/2 z-0" />

                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <TechNode 
                            step={step.id}
                            label={step.label}
                            icon={step.icon}
                            isActive={activeStep === index}
                            isCompleted={activeStep > index}
                        />
                        {index < steps.length - 1 && (
                            <DataStream active={activeStep === index} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

// --- LANDING PAGE COMPONENT ---

export const Landing: React.FC = () => {
  return (
    <div className="flex flex-col items-center w-full max-w-7xl mx-auto px-6 md:px-12 pb-24">
      
      {/* Ambient Red Glow for Depth */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-red/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-red/5 blur-[150px] rounded-full mix-blend-screen pointer-events-none z-0" />
      
      {/* Grid overlay for texture */}
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 z-0 pointer-events-none"></div>

      {/* --- HERO SECTION --- */}
      <section className="min-h-[85vh] flex flex-col justify-start items-center text-center w-full relative z-10 pt-8 md:pt-20">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 bg-brand-dark/80 border border-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
        >
           <Activity size={14} className="text-brand-red animate-pulse" />
           <span className="font-mono text-xs text-gray-300 uppercase tracking-wider">System Status: Critical Alert</span>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-sans text-5xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.9] text-white"
        >
          IMMUTABLE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-white">RESURRECTION</span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl font-mono leading-relaxed"
        >
          Smart contracts are eternal. Frontends are mortal.
          <br/><br/>
          <span className="text-white">PhoenixForge</span> creates decentralized, permanent mirrors of vanished Web3 applications.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-wrap gap-6 justify-center"
        >
          <Link
            href="/resurrect"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-red rounded hover:bg-brand-accent transition-all duration-200 shadow-[0_0_20px_rgba(239,68,68,0.4)] uppercase tracking-widest"
          >
            <span>Ignite Protocol</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white border border-white/20 rounded hover:bg-white/5 transition-all duration-200 bg-black/50 backdrop-blur-sm uppercase tracking-widest font-mono"
          >
            View Archive
          </Link>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-gray-600"
        >
            <ArrowDown size={24} />
        </motion.div>
      </section>

      {/* --- LIVE STATS SECTION --- */}
      <LiveStats />

      {/* --- THE PROBLEM SECTION --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full py-32 border-t border-white/5 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeInUp}>
                <SectionHeader 
                    title="The Centralized Single Point of Failure" 
                    subtitle="System Vulnerability" 
                />
                <p className="text-gray-400 text-lg leading-relaxed font-mono mb-8">
                    Your assets live on the blockchain, but your access lives on AWS. When a project's domain expires, hosting bills aren't paid, or founders disappear, the interface dies.
                </p>
                <div className="bg-brand-red/5 border border-brand-red/20 p-6 rounded relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                        <AlertTriangle size={64} className="text-brand-red" />
                    </div>
                    <h4 className="text-brand-red font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                        <AlertTriangle size={16} /> Critical Risk
                    </h4>
                    <p className="text-sm text-gray-300 font-mono">
                        Over 40% of DeFi & NFT projects from 2021 are now inaccessible via their original frontend, locking non-technical users out of their smart contract interactions.
                    </p>
                </div>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="relative">
                {/* Abstract visualization of a broken link */}
                <div className="aspect-square bg-black border border-white/10 rounded-lg relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]"></div>
                    <div className="flex flex-col items-center gap-8 opacity-80">
                        <div className="w-48 h-16 border-2 border-white/20 rounded flex items-center justify-center bg-black z-10">
                            <span className="font-mono text-xs uppercase tracking-widest text-gray-400">Smart Contract</span>
                        </div>
                        <div className="h-16 w-0.5 bg-brand-red/50 relative">
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black border-2 border-brand-red text-brand-red flex items-center justify-center rotate-45">
                                <div className="-rotate-45">✖</div>
                             </div>
                        </div>
                        <div className="w-48 h-16 border-2 border-dashed border-gray-700 rounded flex items-center justify-center bg-black/50 z-10">
                             <span className="font-mono text-xs uppercase tracking-widest text-gray-600 line-through">Web Interface</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </motion.section>

      {/* --- WORKFLOW SECTION --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full py-20 relative z-10"
      >
        <SectionHeader 
            title="The Resurrection Protocol" 
            subtitle="Operational Workflow" 
            align="center" 
        />
        
        {/* New Animated Graph Workflow */}
        <motion.div variants={fadeInUp}>
            <OperationalWorkflow />
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-16 text-center max-w-2xl mx-auto">
            <p className="font-mono text-sm text-gray-500">
                The protocol utilizes <span className="text-gray-300">Wayback Machine</span> snapshots to recover DOM structures, injects modern <span className="text-gray-300">Wagmi/Viem</span> connectors, and compiles a static build pinned permanently to IPFS.
            </p>
        </motion.div>
      </motion.section>

      {/* --- INTERACTIVE FEATURE SHOWCASE --- */}
      <FeatureShowcase />

      {/* --- FEATURES GRID --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="w-full py-32 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
                icon={Database}
                title="Perma-Storage"
                description="Frontend assets are hashed and pinned to IPFS, ensuring they cannot be taken down by centralized providers."
            />
            <FeatureCard 
                icon={ShieldCheck}
                title="Trustless Access"
                description="Verify the source code hash against the original. No hidden backdoors or malicious router injections."
            />
            <FeatureCard 
                icon={Cloud}
                title="ENS Integration"
                description="Resurrected apps are automatically mapped to readable ENS subdomains (e.g., nouns.phoenix.eth)."
            />
        </div>
      </motion.section>

      {/* --- CTA FOOTER --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="w-full py-20 border-t border-brand-red/30 bg-gradient-to-b from-brand-red/5 to-transparent relative z-10 text-center rounded-lg overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-red to-transparent"></div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter uppercase font-mono">
            Ready to <span className="text-brand-red">Resurrect?</span>
        </h2>
        
        <Link
            href="/resurrect"
            className="inline-flex items-center justify-center px-12 py-5 text-lg font-bold text-black bg-white rounded-none hover:bg-brand-red hover:text-white transition-all duration-300 uppercase tracking-widest shadow-[0_0_50px_rgba(255,255,255,0.2)]"
        >
            Launch System
        </Link>
      </motion.section>

    </div>
  );
};

const FeatureCard: React.FC<{ icon: any; title: string; description: string }> = ({ icon: Icon, title, description }) => (
  <motion.div 
    variants={fadeInUp}
    className="bg-black/40 border border-white/10 p-8 hover:border-brand-red/50 transition-colors group backdrop-blur-sm"
  >
    <div className="w-12 h-12 bg-white/5 rounded flex items-center justify-center mb-6 group-hover:bg-brand-red/20 transition-colors">
        <Icon className="text-white group-hover:text-brand-red transition-colors" size={24} />
    </div>
    <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-4 font-mono">{title}</h3>
    <p className="text-gray-500 font-mono text-sm leading-relaxed">
        {description}
    </p>
  </motion.div>
);