import {
  Board,
  GameState,
  Mark,
  PlayerState,
  RoundResult,
  TRACK_LENGTH,
  WIN_MOVE,
  LOSE_MOVE,
} from "@/types/game";

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/** Inspects the tic-tac-toe board and returns a winner/draw result, or null if the round is still in progress. */
export function checkWinner(board: Board): RoundResult | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Mark, line };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: null, line: null };
  }
  return null;
}

/** Given the round outcome, returns the block delta each mark should move. */
export function calculateMovement(
  result: RoundResult
): Record<Mark, number> {
  if (result.winner === null) {
    return { X: 0, O: 0 };
  }
  const loser: Mark = result.winner === "X" ? "O" : "X";
  return {
    [result.winner]: WIN_MOVE,
    [loser]: LOSE_MOVE,
  } as Record<Mark, number>;
}

/** Applies a movement delta to a player's position, clamped to the track bounds. */
export function updatePlayerPosition(
  player: PlayerState,
  delta: number
): PlayerState {
  const nextPosition = Math.min(
    TRACK_LENGTH,
    Math.max(0, player.position + delta)
  );
  return { ...player, position: nextPosition };
}

/** Returns the mark that has reached the finish line, if any. */
export function checkGameEnd(
  playerX: PlayerState,
  playerO: PlayerState
): Mark | null {
  if (playerX.position >= TRACK_LENGTH) return "X";
  if (playerO.position >= TRACK_LENGTH) return "O";
  return null;
}

export function createEmptyBoard(): Board {
  return Array(9).fill(null);
}

export function createInitialPlayer(mark: Mark, name: string): PlayerState {
  return { mark, name, position: 0, wins: 0, losses: 0, draws: 0 };
}

export function createInitialState(): GameState {
  return {
    board: createEmptyBoard(),
    currentPlayer: "X",
    playerX: createInitialPlayer("X", "Player X"),
    playerO: createInitialPlayer("O", "Player O"),
    winningLine: null,
    roundResult: null,
    gameStatus: "playing",
    champion: null,
    round: 1,
  };
}

/** Places the current player's mark on the board at the given cell index. Returns the next game state. */
export function playMove(state: GameState, cellIndex: number): GameState {
  if (state.gameStatus !== "playing") return state;
  if (state.board[cellIndex] !== null) return state;

  const board = [...state.board];
  board[cellIndex] = state.currentPlayer;

  const result = checkWinner(board);

  if (!result) {
    return {
      ...state,
      board,
      currentPlayer: state.currentPlayer === "X" ? "O" : "X",
    };
  }

  // Round finished: apply movement to both players
  const movement = calculateMovement(result);

  let playerX = updatePlayerPosition(state.playerX, movement.X);
  let playerO = updatePlayerPosition(state.playerO, movement.O);

  if (result.winner === "X") {
    playerX = { ...playerX, wins: playerX.wins + 1 };
    playerO = { ...playerO, losses: playerO.losses + 1 };
  } else if (result.winner === "O") {
    playerO = { ...playerO, wins: playerO.wins + 1 };
    playerX = { ...playerX, losses: playerX.losses + 1 };
  } else {
    playerX = { ...playerX, draws: playerX.draws + 1 };
    playerO = { ...playerO, draws: playerO.draws + 1 };
  }

  const champion = checkGameEnd(playerX, playerO);

  return {
    ...state,
    board,
    playerX,
    playerO,
    winningLine: result.line,
    roundResult: result,
    gameStatus: champion ? "finished" : "roundOver",
    champion,
  };
}

/** Starts a fresh tic-tac-toe round while preserving track positions and scores. */
export function startNextRound(state: GameState): GameState {
  if (state.gameStatus === "finished") return state;
  // Loser (or X on a draw) leads off the next board, alternating who starts.
  const nextStarter: Mark =
    state.roundResult?.winner === "O" ? "O" : state.roundResult?.winner === "X" ? "X" : state.currentPlayer === "X" ? "O" : "X";

  return {
    ...state,
    board: createEmptyBoard(),
    currentPlayer: nextStarter,
    winningLine: null,
    roundResult: null,
    gameStatus: "playing",
    round: state.round + 1,
  };
}

/** Resets the entire game back to its starting state. */
export function resetGame(): GameState {
  return createInitialState();
}
