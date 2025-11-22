'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { History, LayoutGrid, Terminal, Wallet, Power } from 'lucide-react';
import clsx from 'clsx';
import { PhoenixLogo } from './PhoenixLogo';
import { toast } from './ui/Toaster';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = () => {
    if (isConnected) {
      setIsConnected(false);
      toast.success("Session Terminated");
      return;
    }

    setIsConnecting(true);
    // Simulate web3 handshake delay
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      toast.success("Wallet Synced Successfully");
    }, 1500);
  };

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

        {/* Wallet Button */}
        <button
            onClick={handleConnect}
            disabled={isConnecting}
            className={clsx(
                "flex items-center gap-3 px-4 py-2 border transition-all duration-300 font-mono text-xs font-bold uppercase tracking-widest relative overflow-hidden group",
                isConnected
                    ? "border-brand-red bg-brand-red/10 text-brand-red shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                    : "border-white/20 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5"
            )}
        >
            {isConnecting ? (
                <>
                    <div className="animate-spin">
                        <PhoenixLogo className="w-4 h-4 text-brand-red" />
                    </div>
                    <span className="hidden sm:inline">Syncing...</span>
                </>
            ) : isConnected ? (
                <>
                     <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
                     <span className="hidden sm:inline">0x71C...9A23</span>
                     <Power size={14} className="ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
                </>
            ) : (
                <>
                    <Wallet size={16} />
                    <span className="hidden sm:inline">Connect</span>
                </>
            )}
        </button>
      </div>
    </nav>
  );
};