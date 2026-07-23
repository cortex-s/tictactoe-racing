"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mark } from "@/types/game";

interface WinnerModalProps {
  champion: Mark | null;
  onRestart: () => void;
}

export default function WinnerModal({ champion, onRestart }: WinnerModalProps) {
  return (
    <AnimatePresence>
      {champion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="relative w-full max-w-sm rounded-2xl bg-surface border border-amber/30 p-8 text-center overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-2 checker-strip" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-6xl mb-3"
            >
              🏆
            </motion.div>
            <p className="text-xs tracking-widest text-amber uppercase mb-1">
              ชัยชนะ
            </p>
            <h2 className="text-3xl font-bold mb-2">
              ผู้เล่น {champion} ชนะการแข่งขัน!
            </h2>
            <p className="text-muted text-sm mb-6">
              ใครถึงช่อง 20 ก่อนคือผู้ชนะ
            </p>
            <button
              onClick={onRestart}
              className="w-full rounded-xl bg-amber text-[#0f1319] font-semibold text-lg py-3 hover:brightness-105 active:scale-95 transition-all"
            >
              แข่งอีกครั้ง
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
