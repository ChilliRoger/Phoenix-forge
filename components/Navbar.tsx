'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { History, LayoutGrid, Terminal } from 'lucide-react';
import clsx from 'clsx';
import { PhoenixLogo } from './PhoenixLogo';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => {
    const isActive = pathname === to;
    return (
      <Link
        href={to}
        className={clsx(
          "flex items-center gap-2 px-4 py-2 transition-all duration-300 text-xs font-bold uppercase tracking-widest",
          isActive 
            ? "text-brand-red border-b-2 border-brand-red bg-white/5" 
            : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
        )}
      >
        <Icon size={16} className={isActive ? "text-brand-red" : ""} />
        <span className="hidden sm:inline">{label}</span>
      </Link>
    );
  };

  return (
    <nav className="w-full h-20 flex items-center justify-between px-4 md:px-12 sticky top-0 z-50 bg-brand-black/80 backdrop-blur-md border-b border-white/10">
      <Link href="/" className="flex items-center gap-3 group shrink-0">
        <div className="p-1 bg-brand-red/5 rounded border border-brand-red/20 group-hover:border-brand-red/50 group-hover:bg-brand-red/10 transition-all duration-300">
            <PhoenixLogo className="w-10 h-10 text-brand-red" animated={false} />
        </div>
        <div className="hidden md:flex flex-col">
            <span className="font-mono text-lg font-bold tracking-tight text-white leading-none group-hover:text-brand-red transition-colors">
            PHOENIX_FORGE
            </span>
            <span className="text-[10px] text-brand-red tracking-widest uppercase leading-none mt-1 opacity-70">
            Resurrection Protocol
            </span>
        </div>
      </Link>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="flex items-center gap-1">
            <NavItem to="/" icon={LayoutGrid} label="Dashboard" />
            <NavItem to="/resurrect" icon={Terminal} label="Recover" />
            <NavItem to="/gallery" icon={History} label="Archive" />
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-8 bg-white/10 hidden md:block"></div>

        {/* RainbowKit Connect Button */}
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  'style': {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        className="flex items-center gap-3 px-4 py-2 border border-white/20 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300 font-mono text-xs font-bold uppercase tracking-widest"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <span className="hidden sm:inline">Connect</span>
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button
                        onClick={openChainModal}
                        className="flex items-center gap-3 px-4 py-2 border border-yellow-500/50 bg-yellow-500/10 text-yellow-500 hover:border-yellow-500 transition-all duration-300 font-mono text-xs font-bold uppercase tracking-widest"
                      >
                        Wrong Network
                      </button>
                    );
                  }

                  return (
                    <button
                      onClick={openAccountModal}
                      className="flex items-center gap-3 px-4 py-2 border border-brand-red bg-brand-red/10 text-brand-red shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:bg-brand-red/20 transition-all duration-300 font-mono text-xs font-bold uppercase tracking-widest group"
                    >
                      <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
                      <span className="hidden sm:inline">
                        {account.displayName}
                      </span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                        <line x1="12" y1="2" x2="12" y2="12"></line>
                      </svg>
                    </button>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </nav>
  );
};