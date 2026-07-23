"use client";

import { useMemo, useState } from "react";
import {
  createInitialState,
  playMove,
  resetGame,
  startNextRound,
} from "@/lib/gameLogic";
import { GameState } from "@/types/game";
import TicTacToeBoard from "@/components/TicTacToeBoard";
import GameTrack from "@/components/GameTrack";
import ScoreBoard from "@/components/ScoreBoard";
import WinnerModal from "@/components/WinnerModal";
import RoundBanner from "@/components/RoundBanner";

export default function Home() {
  const [state, setState] = useState<GameState>(() => createInitialState());

  const lastEffect = useMemo(() => {
    if (!state.roundResult) return null;
    if (state.roundResult.winner === "X") return "win-x" as const;
    if (state.roundResult.winner === "O") return "win-o" as const;
    return "draw" as const;
  }, [state.roundResult]);

  const handleCellClick = (index: number) => {
    setState((prev) => playMove(prev, index));
  };

  const handleNextRound = () => {
    setState((prev) => startNextRound(prev));
  };

  const handleRestart = () => {
    setState(resetGame());
  };

  const boardDisabled =
    state.gameStatus !== "playing" || state.champion !== null;

  return (
    <main className="flex-1 flex flex-col items-center px-4 py-6 sm:py-10 gap-6 max-w-3xl mx-auto w-full">
      <header className="text-center">
        <p className=" text-xs tracking-[0.3em] text-amber uppercase mb-1">
          เกมโอเอ็กซ์
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
          แข่งกันเข้าเส้นชัย
        </h1>
        <p className="text-muted text-sm mt-1">
          ชนะในยกนั้นเพื่อพารถของคุณพุ่งไปข้างหน้า 3 ช่อง หากแพ้
          รถของคุณจะถอยหลัง 1 ช่อง
        </p>
      </header>

      <ScoreBoard
        playerX={state.playerX}
        playerO={state.playerO}
        currentPlayer={state.currentPlayer}
        round={state.round}
        gameStatus={state.gameStatus}
      />

      <RoundBanner
        result={state.roundResult}
        onNextRound={handleNextRound}
        isFinished={state.gameStatus === "finished"}
      />

      <section className="w-full rounded-2xl bg-surface border border-white/5 p-4 sm:p-6 flex flex-col items-center gap-4">
        <div className="flex items-center justify-between w-full max-w-[340px]">
          <h2 className="text-lg sm:text-xl font-semibold tracking-wide text-foreground/90">
            กระดานเกม
          </h2>
          <span className="text-xs text-muted">
            {state.gameStatus === "playing"
              ? `ตาของผู้เล่น ${state.currentPlayer}`
              : "จบยกนี้แล้ว"}
          </span>
        </div>
        <TicTacToeBoard
          board={state.board}
          onCellClick={handleCellClick}
          winningLine={state.winningLine}
          disabled={boardDisabled}
          currentPlayer={state.currentPlayer}
        />
      </section>

      <GameTrack
        playerX={state.playerX}
        playerO={state.playerO}
        lastEffect={lastEffect}
      />

      <button
        onClick={handleRestart}
        className="rounded-lg border border-white/10 bg-surface-2 px-5 py-2.5 font-semibold text-sm text-foreground/80 hover:text-foreground hover:border-white/25 active:scale-95 transition-all"
      >
        เริ่มใหม่ตั้งแต่ต้น (รอใส่ Modal Popup)
      </button>

      <WinnerModal champion={state.champion} onRestart={handleRestart} />
    </main>
  );
}
