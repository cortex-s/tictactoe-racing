export type Mark = "X" | "O";
export type Cell = Mark | null;
export type Board = Cell[];

export type GameStatus = "playing" | "roundOver" | "finished";

export type RoundResult = {
  winner: Mark | null; // null = draw
  line: number[] | null;
};

export interface PlayerState {
  mark: Mark;
  name: string;
  position: number;
  wins: number;
  losses: number;
  draws: number;
}

export interface GameState {
  board: Board;
  currentPlayer: Mark;
  playerX: PlayerState;
  playerO: PlayerState;
  winningLine: number[] | null;
  roundResult: RoundResult | null;
  gameStatus: GameStatus;
  champion: Mark | null;
  round: number;
}

export const TRACK_LENGTH = 20;
export const WIN_MOVE = 3;
export const LOSE_MOVE = -1;
