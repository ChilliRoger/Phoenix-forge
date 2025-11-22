'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckSquare, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

let addToastFn: ((message: string, type: ToastType) => void) | null = null;

export const toast = {
  success: (message: string) => addToastFn?.(message, 'success'),
  error: (message: string) => addToastFn?.(message, 'error'),
};

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (message, type) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };
    return () => { addToastFn = null; };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2 font-mono">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
            className="flex items-center gap-3 bg-brand-black border border-brand-red/30 text-white px-4 py-3 shadow-[0_0_15px_rgba(239,68,68,0.15)] min-w-[300px]"
          >
            {t.type === 'success' ? (
              <CheckSquare className="text-brand-red" size={18} />
            ) : (
              <AlertTriangle className="text-brand-red" size={18} />
            )}
            <span className="text-xs uppercase tracking-wider font-bold">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};