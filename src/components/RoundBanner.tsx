"use client";

import { AnimatePresence, motion } from "framer-motion";
import { RoundResult } from "@/types/game";
import { ArrowRight } from "lucide-react";

interface RoundBannerProps {
  result: RoundResult | null;
  onNextRound: () => void;
  isFinished: boolean;
}

export default function RoundBanner({
  result,
  onNextRound,
  isFinished,
}: RoundBannerProps) {
  if (!result || isFinished) return null;

  const isDraw = result.winner === null;
  const loser = result.winner === "X" ? "O" : "X";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className={`w-full rounded-xl border p-4 flex flex-col sm:flex-row items-center justify-between gap-3 ${
          isDraw
            ? "bg-surface-2 border-white/10"
            : "bg-surface-2 border-success/30"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{isDraw ? "🤝" : "🏎️"}</span>
          <div>
            {isDraw ? (
              <p className="text-lg font-semibold">
                ยกนี้เสมอ — ไม่มีใครขยับตำแหน่ง
              </p>
            ) : (
              <p className="text-lg font-semibold">
                ผู้เล่น {result.winner} ชนะยกนี้{" "}
                <span className="text-success">+3 ช่อง</span>
                {" · "}
                ผู้เล่น {loser} <span className="text-racer-x">-1 ช่อง</span>
              </p>
            )}
          </div>
        </div>
        <button
          onClick={onNextRound}
          className="shrink-0 rounded-lg bg-amber text-[#0f1319] font-semibold px-5 py-2 hover:brightness-105 active:scale-95 transition-all"
        >
          รอบต่อไป <ArrowRight className="inline-flex" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
