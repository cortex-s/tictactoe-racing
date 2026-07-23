"use client";

import { motion } from "framer-motion";
import { Board, Mark } from "@/types/game";

interface TicTacToeBoardProps {
  board: Board;
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  disabled: boolean;
  currentPlayer: Mark;
}

const MARK_COLOR: Record<Mark, string> = {
  X: "text-racer-x",
  O: "text-racer-o",
};

export default function TicTacToeBoard({
  board,
  onCellClick,
  winningLine,
  disabled,
  currentPlayer,
}: TicTacToeBoardProps) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-[340px] mx-auto">
      {board.map((cell, index) => {
        const isWinningCell = winningLine?.includes(index) ?? false;
        const isPlayable = !disabled && cell === null;
        return (
          <button
            key={index}
            type="button"
            onClick={() => isPlayable && onCellClick(index)}
            disabled={!isPlayable}
            aria-label={
              cell
                ? `Cell ${index + 1}, occupied by ${cell}`
                : `Cell ${index + 1}, empty`
            }
            className={`aspect-square rounded-xl flex items-center justify-center text-4xl sm:text-5xl font-bold transition-colors border
              ${
                isWinningCell
                  ? "bg-success/15 border-success/60"
                  : "bg-surface-2 border-white/5"
              }
              ${
                isPlayable
                  ? "hover:bg-white/5 hover:border-white/15 cursor-pointer active:scale-95"
                  : "cursor-default"
              }
              ${!disabled && !cell ? "focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber" : ""}
            `}
          >
            {cell && (
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className={MARK_COLOR[cell]}
              >
                {cell}
              </motion.span>
            )}
          </button>
        );
      })}
      <span className="sr-only" role="status">
        {`It is Player ${currentPlayer}'s turn`}
      </span>
    </div>
  );
}
