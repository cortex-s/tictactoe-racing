"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TRACK_LENGTH } from "@/types/game";
import { PlayerState } from "@/types/game";
import PlayerToken from "./PlayerToken";
import { ArrowRight } from "lucide-react";

interface GameTrackProps {
  playerX: PlayerState;
  playerO: PlayerState;
  lastEffect: "win-x" | "win-o" | "draw" | null;
}

export default function GameTrack({
  playerX,
  playerO,
  lastEffect,
}: GameTrackProps) {
  const blocks = Array.from({ length: TRACK_LENGTH + 1 }, (_, i) => i);

  return (
    <div className="w-full rounded-2xl bg-surface border border-white/5 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-foreground/90">
          สนามแข่ง
        </h2>
        <span className="text-xs text-muted">
          0 <ArrowRight className="inline-flex" /> {TRACK_LENGTH} ช่อง
        </span>
      </div>

      <div className="relative overflow-x-auto p-4">
        <div className="flex min-w-[720px] sm:min-w-0 gap-1">
          {blocks.map((block) => {
            const isStart = block === 0;
            const isFinish = block === TRACK_LENGTH;
            const hasX = playerX.position === block;
            const hasO = playerO.position === block;
            return (
              <div
                key={block}
                className={`relative flex-1 h-16 sm:h-20 rounded-md border flex items-end justify-center pb-1 transition-colors ${
                  isFinish
                    ? "checker-strip border-amber/60"
                    : isStart
                      ? "bg-surface-2 border-success/30"
                      : "bg-surface-2 border-white/5"
                }`}
              >
                {hasX && <PlayerToken mark="X" lane="top" />}
                {hasO && <PlayerToken mark="O" lane="bottom" />}
                <span className="text-[10px] text-muted/70">
                  {block}
                </span>

                <AnimatePresence>
                  {isFinish && lastEffect && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 text-2xl"
                    >
                      🏁
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-racer-x" />
          <span className="text-muted">
            ผู้เล่น X — ช่อง {playerX.position}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-racer-o" />
          <span className="text-muted">
            ผู้เล่น O — ช่อง {playerO.position}
          </span>
        </div>
      </div>
    </div>
  );
}
