"use client";

import { motion } from "framer-motion";
import { Mark } from "@/types/game";

interface PlayerTokenProps {
  mark: Mark;
  lane: "top" | "bottom";
}

const MARK_STYLES: Record<Mark, { bg: string; ring: string; glyph: string }> = {
  X: { bg: "bg-racer-x", ring: "ring-racer-x/40", glyph: "X" },
  O: { bg: "bg-racer-o", ring: "ring-racer-o/40", glyph: "O" },
};

export default function PlayerToken({ mark, lane }: PlayerTokenProps) {
  const style = MARK_STYLES[mark];
  return (
    <motion.div
      layout
      layoutId={`racer-${mark}`}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`absolute ${
        lane === "top" ? "-top-3" : "-bottom-3"
      } left-1/2 -translate-x-1/2 z-10`}
    >
      <div
        className={`h-7 w-7 sm:h-8 sm:w-8 rounded-full ${style.bg} ring-4 ${style.ring} shadow-lg shadow-black/40 flex items-center justify-center font-bold text-sm text-[#0f1319]`}
      >
        {style.glyph}
      </div>
    </motion.div>
  );
}
