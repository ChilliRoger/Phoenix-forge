'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Lock, Globe, Code, Database } from 'lucide-react';

const features = [
  {
    id: 'ipfs',
    icon: Database,
    title: 'IPFS Storage',
    description: 'Content-addressed, immutable storage on IPFS. Files are cryptographically verified and distributed across the network.',
    demo: 'QmXyZ1a2b3c4d5e6f7g8h9i0j',
    stats: { uploaded: '1.2TB', nodes: 47 }
  },
  {
    id: 'ens',
    icon: Globe,
    title: 'ENS Integration',
    description: 'Human-readable addresses via Ethereum Name Service. Your resurrected sites get permanent .eth domains.',
    demo: 'mysite.phoenixforge.eth',
    stats: { domains: 127, resolution: '99.9%' }
  },
  {
    id: 'wallet',
    icon: Lock,
    title: 'Wallet Connected',
    description: 'Full Web3 wallet integration with RainbowKit. Support for MetaMask, WalletConnect, Coinbase, and 300+ wallets.',
    demo: '0x71C7...9A23',
    stats: { connected: '8.4K', networks: 5 }
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Tamper-Proof',
    description: 'Content hashes ensure files cannot be modified. Every deployment is cryptographically verified on-chain.',
    demo: 'SHA256: a1b2c3...',
    stats: { verified: '100%', audits: 12 }
  },
  {
    id: 'speed',
    icon: Zap,
    title: 'Instant Deploy',
    description: 'Deploy to IPFS and ENS in seconds. Automated CI/CD pipeline with instant global propagation.',
    demo: '< 30 seconds',
    stats: { avgTime: '24s', success: '99.8%' }
  },
  {
    id: 'opensource',
    icon: Code,
    title: 'Open Source',
    description: 'Fully open-source codebase. Fork, modify, and deploy your own instance. No vendor lock-in.',
    demo: 'github.com/phoenix',
    stats: { stars: 589, forks: 34 }
  },
];

export const FeatureShowcase: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);

  return (
    <div className="w-full my-24">
      <div className="text-center mb-12">
        <div className="inline-block px-3 py-1 bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs mb-4 uppercase tracking-[0.2em] font-mono">
          Core Features
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight font-mono">
          Built for Permanence
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Feature Tabs */}
        <div className="md:col-span-1 space-y-2">
          {features.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setSelectedFeature(feature)}
              className={`w-full text-left p-4 border transition-all ${
                selectedFeature.id === feature.id
                  ? 'bg-brand-red/10 border-brand-red text-white'
                  : 'bg-black/20 border-white/10 text-gray-400 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <feature.icon size={20} className={selectedFeature.id === feature.id ? 'text-brand-red' : 'text-gray-500'} />
                <span className="font-mono font-bold uppercase text-sm">{feature.title}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Feature Display */}
        <div className="md:col-span-2 bg-black/40 border border-white/10 p-8 backdrop-blur-sm min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFeature.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 bg-brand-red/10 border border-brand-red/20">
                  <selectedFeature.icon className="w-8 h-8 text-brand-red" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-mono uppercase">
                    {selectedFeature.title}
                  </h3>
                  <p className="text-gray-400 font-mono text-sm leading-relaxed">
                    {selectedFeature.description}
                  </p>
                </div>
              </div>

              {/* Demo Display */}
              <div className="bg-black border border-brand-red/30 p-6 mb-6 font-mono">
                <div className="text-gray-500 text-xs mb-2 uppercase">Live Demo</div>
                <div className="text-brand-red text-lg font-bold">{selectedFeature.demo}</div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(selectedFeature.stats).map(([key, value]) => (
                  <div key={key} className="bg-white/5 p-4 border border-white/10">
                    <div className="text-white text-2xl font-bold font-mono">{value}</div>
                    <div className="text-gray-500 text-xs uppercase tracking-wider font-mono">{key}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
