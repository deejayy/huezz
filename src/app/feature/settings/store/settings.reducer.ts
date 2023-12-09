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
  extraSelectors: ({ selectLatestUpdate, selectAckUpdate }) => ({
    selectNewFeatures: createSelector(
      selectLatestUpdate,
      selectAckUpdate,
      (latestUpdate, ackUpdate) => latestUpdate.toString() !== ackUpdate?.toString(),
    ),
  }),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const settingsMetaReducer = (reducer: any): any => {
  return (state: SettingsState, action: Action) => {
    const newState = reducer(state, action);

    if (action.type === '@ngrx/store/init') {
      try {
        const ackDate: string | undefined = localStorage.getItem('ackDate') ?? undefined;

        newState.settings.ackUpdate = ackDate ? new Date(ackDate) : undefined;
      } catch (e) {
        console.error('Cannot acccess localStorage', e);
      }
    }

    return newState;
  };
};
