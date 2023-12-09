import { Action, createFeature, createReducer, createSelector } from '@ngrx/store';
import { produceOn } from '@shared/helper/produce-on';
import { SettingsActions } from './settings.actions';
import { SettingsState, initialSettingsState } from './settings.state';

export const settingsReducer = createReducer(
  initialSettingsState,
  produceOn(SettingsActions.setBoardWidth, (state, action) => {
    state.boardWidth = action.size;
  }),
  produceOn(SettingsActions.setBoardHeight, (state, action) => {
    state.boardHeight = action.size;
  }),
  produceOn(SettingsActions.acknowledgeUpdate, (state) => {
    state.ackUpdate = state.latestUpdate;
  }),
  produceOn(SettingsActions.setDifficulty, (state, action) => {
    state.difficulty = action.level;
  }),
);

export const settingsFeature = createFeature({
  name: 'settings',
  reducer: settingsReducer,
  extraSelectors: ({ selectLatestUpdate, selectAckUpdate, selectBoardHeight, selectBoardWidth, selectDifficulty }) => ({
    selectNewFeatures: createSelector(
      selectLatestUpdate,
      selectAckUpdate,
      (latestUpdate, ackUpdate) => latestUpdate.toString() !== ackUpdate?.toString(),
    ),
    selectSettings: createSelector(selectBoardHeight, selectBoardWidth, selectDifficulty, (boardHeight, boardWidth, difficulty) => ({
      boardHeight,
      boardWidth,
      difficulty,
    })),
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const settingsMetaReducer = (reducer: any): any => {
  // eslint-disable-next-line complexity
  return (state: SettingsState, action: Action) => {
    const newState = reducer(state, action) as { settings: SettingsState };

    if (action.type === '@ngrx/store/init') {
      try {
        const ackDate: string | undefined = localStorage.getItem('ackDate') ?? undefined;

        newState.settings.ackUpdate = ackDate ? new Date(ackDate) : undefined;
      } catch (e) {
        console.error('Cannot acccess localStorage', e);
      }

      try {
        const storedSettings = JSON.parse(localStorage.getItem('settings') ?? '{}');
        newState.settings.boardWidth = storedSettings.boardWidth ?? 5;
        newState.settings.boardHeight = storedSettings.boardHeight ?? 10;
        newState.settings.difficulty = storedSettings.difficulty ?? 10;
      } catch (e) {
        console.error('Cannot acccess localStorage', e);
      }
    }

    return newState;
  };
};
