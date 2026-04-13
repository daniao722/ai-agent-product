'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import LaunchChecklist from './LaunchChecklist';
import { INITIAL_CHECKLIST_TASKS } from '@/types/launch-checklist';

export default function LaunchChecklistWidget() {
  const [isOpen, setIsOpen] = useState(false);

  const pendingCount = useMemo(() => {
    return INITIAL_CHECKLIST_TASKS.filter(t => 
      t.status === 'pending' || t.status === 'warning'
    ).length;
  }, []);

  return (
    <>
      <div className="fixed right-4 bottom-4 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="relative p-4 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <span className="text-2xl">🚀</span>
          {pendingCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
            >
              {pendingCount}
            </motion.span>
          )}
        </motion.button>
      </div>

      {isOpen && <LaunchChecklist onClose={() => setIsOpen(false)} />}
    </>
  );
}
