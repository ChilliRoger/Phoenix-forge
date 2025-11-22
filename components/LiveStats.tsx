'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Database, Link, Zap, FileCode } from 'lucide-react';

interface StatCardProps {
  icon: React.ElementType;
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  trend?: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label, suffix = '', prefix = '', trend }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-black/40 border border-white/10 p-6 backdrop-blur-sm hover:border-brand-red/30 transition-all group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-brand-red/10 border border-brand-red/20 group-hover:bg-brand-red/20 transition-colors">
          <Icon className="w-6 h-6 text-brand-red" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-500 text-xs font-mono">
            <TrendingUp size={12} />
            +{trend}%
          </div>
        )}
      </div>
      <div className="font-mono text-3xl font-bold text-white mb-2">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-500 text-sm uppercase tracking-wider font-mono">
        {label}
      </div>
    </motion.div>
  );
};

export const LiveStats: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full my-16">
      <StatCard icon={Database} value={2847} label="IPFS Pins Created" trend={24} />
      <StatCard icon={Link} value={156} label="ENS Domains Issued" trend={18} />
      <StatCard icon={Zap} value={3.2} suffix="s" label="Avg Recovery Time" />
      <StatCard icon={FileCode} value={847} label="Smart Contracts Saved" trend={45} />
    </div>
  );
};
