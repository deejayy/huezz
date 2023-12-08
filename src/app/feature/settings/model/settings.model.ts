export const gameModes = {
  STANDARD: 'standard',
  TETRIS: 'tetris',
  EXTREME: 'extreme',
} as const;

export type GameMode = (typeof gameModes)[keyof typeof gameModes];
