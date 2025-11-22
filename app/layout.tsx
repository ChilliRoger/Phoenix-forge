'use client';

import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { useState, useEffect } from 'react'
import { LoadingScreen } from '@/components/LoadingScreen'
import { AnimatePresence } from 'framer-motion'
import { Web3Provider } from '@/lib/web3Provider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This only runs once on initial mount
  }, []);

  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
        <Web3Provider>
          <AnimatePresence mode="wait">
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
          </AnimatePresence>
          {!isLoading && children}
        </Web3Provider>
      </body>
    </html>
  )
}
