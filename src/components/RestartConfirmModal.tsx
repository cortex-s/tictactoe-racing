"use client";

import { AnimatePresence, motion } from "framer-motion";

interface RestartConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function RestartConfirmModal({
  open,
  onCancel,
  onConfirm,
}: RestartConfirmModalProps) {
  return (
    <AnimatePresence>
      {open && (
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
            className="relative w-full max-w-sm rounded-2xl bg-surface border border-white/10 p-8 text-center overflow-hidden"
          >
            <div className="text-5xl mb-3">⚠️</div>
            <h2 className="text-2xl font-bold mb-2">
              เริ่มการแข่งขันใหม่?
            </h2>
            <p className="text-muted text-sm mb-6">
              ความคืบหน้าปัจจุบันทั้งหมดจะถูกลบ คุณต้องการเริ่มใหม่หรือไม่?
            </p>
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 rounded-xl border border-white/10 bg-surface-2 text-foreground/80 font-semibold text-base py-3 hover:text-foreground hover:border-white/25 active:scale-95 transition-all"
              >
                ยกเลิก
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl bg-amber text-[#0f1319] font-semibold text-base py-3 hover:brightness-105 active:scale-95 transition-all"
              >
                ยืนยัน
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
