export interface ScoreState {
  score: number;
  gameStart: Date;
  playing: boolean;
  steps: number;
  highScore: Record<number, number>;
}

export const initialScoreState: ScoreState = {
  score: 0,
  gameStart: new Date(),
  playing: false,
  steps: 0,
  highScore: {},
};
