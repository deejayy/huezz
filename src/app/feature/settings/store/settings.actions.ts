import { createAction, props } from '@ngrx/store';

export class SettingsActions {
  public static acknowledgeUpdate = createAction('[Settings] Acknowledge Update');
  public static setBoardWidth = createAction('[Settings] Set Board Width', props<{ size: number }>());
  public static setBoardHeight = createAction('[Settings] Set Board Height', props<{ size: number }>());
}
