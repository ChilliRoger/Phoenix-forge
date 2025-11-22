import React from 'react';
import { motion, Variants } from 'framer-motion';
import clsx from 'clsx';

interface PhoenixLogoProps {
  className?: string;
  animated?: boolean;
}

export const PhoenixLogo: React.FC<PhoenixLogoProps> = ({ className, animated = false }) => {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.1, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay: i * 0.1, duration: 0.01 }
      }
    })
  };

  return (
    <div className={clsx("relative flex items-center justify-center", className)}>
      <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient id="phoenixGradient" x1="0" y1="100" x2="100" y2="0">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <filter id="glow-sm" x="-20%" y="-20%" width="140%" height="140%">
             <feGaussianBlur stdDeviation="2" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Central Core Diamond */}
        <motion.path
          d="M50 25 L65 50 L50 75 L35 50 Z"
          fill="transparent"
          stroke="url(#phoenixGradient)"
          strokeWidth="3"
          strokeLinejoin="round"
          variants={draw}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          custom={0}
          className="drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
        />
        
        {/* Inner Core - Solid Pulse */}
        <motion.path
           d="M50 35 L58 50 L50 65 L42 50 Z"
           fill="#ef4444"
           initial={{ opacity: 0.5, scale: 0.8, transformOrigin: "50% 50%" }}
           animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.1, 0.8] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Left Wing - Top Segment */}
        <motion.path
          d="M35 40 L20 25 L5 25 L5 45 L25 65"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          custom={1}
          className="text-gray-200"
        />

        {/* Right Wing - Top Segment */}
        <motion.path
          d="M65 40 L80 25 L95 25 L95 45 L75 65"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          custom={1}
          className="text-gray-200"
        />

        {/* Left Wing - Bottom Segment */}
        <motion.path
          d="M28 75 L15 85 L5 75"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          custom={2}
          filter="url(#glow-sm)"
        />

        {/* Right Wing - Bottom Segment */}
        <motion.path
          d="M72 75 L85 85 L95 75"
          stroke="#ef4444"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={draw}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          custom={2}
          filter="url(#glow-sm)"
        />

        {/* Vertical Tech Line */}
        <motion.path
           d="M50 10 L50 20 M50 80 L50 90"
           stroke="currentColor"
           strokeWidth="1"
           strokeDasharray="2 2"
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 1, duration: 0.5 }}
           className="text-gray-500"
        />
      </svg>
    </div>
  );
};