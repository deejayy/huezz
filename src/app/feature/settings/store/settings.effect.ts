import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, tap } from 'rxjs';
import { SettingsActions } from './settings.actions';
import { SettingsFacade } from './settings.facade';

@Injectable()
export class SettingsEffects {
  public ackUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SettingsActions.acknowledgeUpdate),
        switchMap(() => {
          return this.settingsFacade.latestUpdate$;
        }),
        tap((latestUpdate) => {
          localStorage.setItem('ackDate', latestUpdate.toString());
        }),
      ),
    { dispatch: false },
  );

  public saveSettings$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SettingsActions.setBoardHeight, SettingsActions.setBoardWidth, SettingsActions.setDifficulty),
        switchMap(() => this.settingsFacade.settings$),
        tap((settings) => {
          localStorage.setItem('settings', JSON.stringify(settings));
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private settingsFacade: SettingsFacade) {}
}
