"use client";

import { Mark, PlayerState } from "@/types/game";

interface ScoreBoardProps {
  playerX: PlayerState;
  playerO: PlayerState;
  currentPlayer: Mark;
  round: number;
  gameStatus: "playing" | "roundOver" | "finished";
}

function PlayerCard({
  player,
  active,
  accentClass,
  align,
}: {
  player: PlayerState;
  active: boolean;
  accentClass: string;
  align: "left" | "right";
}) {
  return (
    <div
      className={`flex-1 rounded-2xl border p-4 transition-all ${
        active
          ? `bg-surface-2 border-white/15 shadow-lg shadow-black/30`
          : "bg-surface border-white/5"
      } ${align === "right" ? "text-right" : "text-left"}`}
    >
      <div
        className={`flex items-center gap-2 ${
          align === "right" ? "flex-row-reverse" : ""
        }`}
      >
        <span
          className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center font-bold text-[#0f1319] ${accentClass}`}
        >
          {player.mark}
        </span>
        <div>
          <p className="text-lg font-semibold leading-none">
            {player.name}
          </p>
          {active && (
            <p className="text-[11px] text-amber mt-1">
              ตาคุณ
            </p>
          )}
        </div>
      </div>

      <div
        className={`mt-3 grid grid-cols-3 gap-2 text-xs ${
          align === "right" ? "direction-rtl" : ""
        }`}
      >
        <div className="text-center rounded-lg bg-black/20 py-1.5">
          <p className="text-muted">ตำแหน่งปัจจุบัน</p>
          <p className="text-sm font-semibold text-foreground">
            {player.position}
          </p>
        </div>
        <div className="text-center rounded-lg bg-black/20 py-1.5">
          <p className="text-muted">ชนะ</p>
          <p className="text-sm font-semibold text-success">{player.wins}</p>
        </div>
        <div className="text-center rounded-lg bg-black/20 py-1.5">
          <p className="text-muted">แพ้</p>
          <p className="text-sm font-semibold text-racer-x">{player.losses}</p>
        </div>
      </div>
    </div>
  );
}

export default function ScoreBoard({
  playerX,
  playerO,
  currentPlayer,
  round,
  gameStatus,
}: ScoreBoardProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center mb-3">
        <div className="px-3 py-1 rounded-full bg-surface-2 border border-white/10 text-xs text-muted">
          ROUND {round} ·{" "}
          {gameStatus === "finished" ? "RACE COMPLETE" : "IN PROGRESS"}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <PlayerCard
          player={playerX}
          active={currentPlayer === "X" && gameStatus === "playing"}
          accentClass="bg-racer-x"
          align="left"
        />
        <PlayerCard
          player={playerO}
          active={currentPlayer === "O" && gameStatus === "playing"}
          accentClass="bg-racer-o"
          align="right"
        />
      </div>
    </div>
  );
}
