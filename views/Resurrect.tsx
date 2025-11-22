'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../store';
import { Search, Layers, UploadCloud, Copy, Terminal as TerminalIcon } from 'lucide-react';
import { toast } from '../components/ui/Toaster';
import clsx from 'clsx';

// --- Subcomponents ---

const TerminalView: React.FC = () => {
  const { logs } = useStore();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 bg-black rounded-none border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)] font-mono text-sm relative overflow-hidden">
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%]"></div>
      
      <div className="bg-brand-dark px-4 py-2 flex items-center justify-between border-b border-white/10">
        <span className="text-brand-red text-xs uppercase tracking-widest font-bold">System Logs // Phoenix_CLI_v1.0.4</span>
        <div className="flex gap-1.5">
           <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="p-6 h-64 overflow-y-auto space-y-2 font-mono text-xs md:text-sm">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-3">
            <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
            <span className={clsx(
              "tracking-tight",
              log.type === 'success' && 'text-brand-red font-bold',
              log.type === 'error' && 'text-red-500 font-bold',
              log.type === 'warning' && 'text-yellow-500',
              log.type === 'info' && 'text-gray-300',
            )}>
              {log.type === 'success' && '>> '}
              {log.message}
            </span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

const ProgressBar: React.FC = () => {
  const { progress } = useStore();
  return (
    <div className="w-full max-w-xl mx-auto mt-8 font-mono">
      <div className="flex justify-between text-xs uppercase tracking-widest text-brand-red mb-2">
        <span>Process_Status</span>
        <span>{progress}%</span>
      </div>
      <div className="h-4 bg-brand-dark border border-white/10 p-0.5">
        <motion.div 
          className="h-full bg-brand-red"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "tween", ease: "linear" }}
        />
      </div>
    </div>
  );
};

const SplitPreview: React.FC = () => {
  const { currentProject, finalizePin } = useStore();
  const [sliderX, setSliderX] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-6 font-mono">
        <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Artifact_Preview</h2>
        <button 
          onClick={() => finalizePin()}
          className="bg-brand-red hover:bg-brand-accent text-white px-6 py-3 rounded flex items-center gap-3 font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.3)] uppercase text-sm tracking-widest"
        >
          <UploadCloud size={16} />
          Commence Pinning
        </button>
      </div>

      <div className="relative h-[500px] border border-brand-red/30 shadow-2xl select-none bg-black" ref={containerRef}>
        {/* Background (Reborn) */}
        <div 
          className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${currentProject?.rebornImage})` }}
        >
          <div className="bg-black/80 p-6 backdrop-blur-md border border-brand-red/50 max-w-xs">
            <h3 className="text-brand-red font-mono text-xs uppercase mb-2 tracking-widest">Live_Data_Stream</h3>
            <p className="text-white font-bold text-3xl font-mono">$42,069,133</p>
            <p className="text-gray-500 text-xs font-mono mt-1">Treasury_Balance_Verified</p>
          </div>
        </div>

        {/* Foreground (Original - Clipped) */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center grayscale contrast-125 border-r border-brand-red"
          style={{ 
            backgroundImage: `url(${currentProject?.previewImage})`,
            width: `${sliderX}%`
          }}
        >
           <div className="absolute inset-0 bg-black/20"></div>
        </motion.div>
        
        {/* Draggable Handle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-brand-red cursor-ew-resize z-20 shadow-[0_0_20px_rgba(239,68,68,1)]"
          style={{ left: `${sliderX}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-brand-red text-black p-2 shadow-lg">
            <Layers size={16} />
          </div>
        </div>
        
        {/* Interaction layer */}
        <div 
          className="absolute inset-0 cursor-ew-resize z-10"
          onMouseMove={(e) => {
             if (e.buttons === 1 && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                setSliderX((x / rect.width) * 100);
             }
          }}
        />
      </div>
    </div>
  );
};

const SuccessModal: React.FC = () => {
  const { currentProject, reset } = useStore();
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-300 font-mono">
      <div className="bg-black border border-brand-red p-10 max-w-lg w-full text-center relative shadow-[0_0_100px_rgba(239,68,68,0.2)]">
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10"
        >
          <div className="w-16 h-16 border-2 border-brand-red flex items-center justify-center mx-auto mb-6 bg-brand-red/10">
            <UploadCloud className="text-brand-red w-8 h-8" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">Resurrection Complete</h2>
          <p className="text-gray-400 mb-8 text-sm">
            Artifact successfully pinned to decentralized storage network.
          </p>
          
          <div className="bg-white/5 p-6 text-left space-y-4 mb-8 border border-white/10">
             <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs uppercase">ENS Gateway</span>
                <div className="flex items-center gap-2 text-brand-red text-sm font-bold cursor-pointer hover:underline" onClick={() => toast.success('Copied')}>
                    {currentProject?.ens} <Copy size={12} />
                </div>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-gray-500 text-xs uppercase">IPFS Hash</span>
                <div className="flex items-center gap-2 text-gray-300 text-xs truncate max-w-[150px] cursor-pointer hover:text-white" onClick={() => toast.success('Copied')}>
                    {currentProject?.ipfsHash} <Copy size={12} />
                </div>
             </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button 
              onClick={reset}
              className="px-6 py-3 border border-white/20 hover:bg-white/5 text-white text-sm uppercase tracking-widest font-bold transition-colors"
            >
              Reset System
            </button>
            <button 
              className="px-6 py-3 bg-brand-red text-white hover:bg-brand-accent text-sm uppercase tracking-widest font-bold transition-colors"
              onClick={() => toast.success('Opening Gateway...')}
            >
              Launch DApp
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const Resurrect: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const { step, startResurrection, progress } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput) return;
    startResurrection(urlInput);
  };

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center min-h-screen max-w-5xl">
      
      <div className="text-center mb-16 mt-8">
        <div className="inline-block px-3 py-1 border border-brand-red/30 text-brand-red text-xs mb-4 uppercase tracking-[0.2em]">
            System Ready
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-mono uppercase tracking-tight">Resurrection Chamber</h1>
        <p className="text-gray-500 font-mono text-sm max-w-lg mx-auto">Initialize the recovery sequence by providing the target URL coordinates.</p>
      </div>

      {step === 'input' && (
        <motion.form 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onSubmit={handleSubmit}
          className="w-full max-w-3xl relative"
        >
          <div className="flex items-center bg-black border border-white/20 p-2 focus-within:border-brand-red transition-colors shadow-lg">
              <div className="pl-4 text-brand-red">
                <TerminalIcon size={20} />
              </div>
              <input
                type="text"
                placeholder="ENTER_TARGET_URL"
                className="w-full bg-transparent border-none text-white px-4 py-4 focus:ring-0 focus:outline-none text-lg font-mono placeholder:text-gray-700"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
              />
              <button 
                type="submit"
                disabled={!urlInput}
                className="bg-white/10 hover:bg-brand-red hover:text-white text-gray-300 px-8 py-3 font-bold uppercase text-sm tracking-widest transition-all disabled:opacity-30"
              >
                Execute
              </button>
          </div>
          
          <div className="mt-6 flex gap-6 text-xs text-gray-600 justify-center font-mono uppercase tracking-wide">
            <span className="cursor-pointer hover:text-brand-red transition-colors" onClick={() => setUrlInput('https://nouns.wtf')}>[Load_Sample: Nouns]</span>
            <span className="cursor-pointer hover:text-brand-red transition-colors" onClick={() => setUrlInput('https://defikingdoms.com')}>[Load_Sample: DFK]</span>
          </div>
        </motion.form>
      )}

      {(step === 'scanning' || step === 'pinning' || step === 'complete') && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full"
        >
          {step !== 'complete' && <ProgressBar />}
          <TerminalView />
        </motion.div>
      )}

      {step === 'preview' && <SplitPreview />}
      {step === 'complete' && <SuccessModal />}

    </div>
  );
};