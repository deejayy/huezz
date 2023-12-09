import { Action, createFeature, createReducer, createSelector } from '@ngrx/store';
import { produceOn } from '@shared/helper/produce-on';
import { ScoreActions } from './score.action';
import { ScoreState, initialScoreState } from './score.state';

export const scoreReducer = createReducer(
  initialScoreState,
  produceOn(ScoreActions.resetScore, (state) => {
    state.score = 0;
  }),
  produceOn(ScoreActions.startGame, (state, action) => {
    state.playing = true;
    state.steps = action.score;
    state.gameStart = new Date();
  }),
  produceOn(ScoreActions.endGame, (state, action) => {
    state.playing = false;
    state.score = (new Date().getTime() - state.gameStart.getTime()) * state.steps * action.multiplier;
  }),
  produceOn(ScoreActions.addStep, (state) => {
    state.steps += 1;
  }),
);

export const scoreFeature = createFeature({
  name: 'score',
  reducer: scoreReducer,
  extraSelectors: ({ selectPlaying }) => ({
    selectNotPlaying: createSelector(selectPlaying, (playing) => !playing),
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const scoreMetaReducer = (reducer: any): any => {
  return (state: ScoreState, action: Action) => {
    const newState = reducer(state, action);

    if (action.type === '@ngrx/store/init') {
      // newState.score.scoreByMode[gameModes.STANDARD].highScore = parseInt(storedScoreInfo);
    }

    return newState;
  };
};
