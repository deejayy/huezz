import { Action, createFeature, createReducer } from '@ngrx/store';
import { produceOn } from '@shared/helper/produce-on';
import { ScoreActions } from './score.action';
import { ScoreState, initialScoreState } from './score.state';

export const scoreReducer = createReducer(
  initialScoreState,
  produceOn(ScoreActions.resetScore, (state, action) => {
    console.warn(state, action);
  }),
);

export const scoreFeature = createFeature({
  name: 'score',
  reducer: scoreReducer,
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
