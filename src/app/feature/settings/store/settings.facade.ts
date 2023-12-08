import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SettingsActions } from './settings.actions';
import { settingsFeature } from './settings.reducer';
import { SettingsState } from './settings.state';

@Injectable()
export class SettingsFacade {
  public newFeatures$: Observable<boolean> = this.store.select(settingsFeature.selectNewFeatures);
  public latestUpdate$: Observable<Date> = this.store.select(settingsFeature.selectLatestUpdate);
  public boardWidth$: Observable<number> = this.store.select(settingsFeature.selectBoardWidth);
  public boardHeight$: Observable<number> = this.store.select(settingsFeature.selectBoardHeight);

  constructor(private store: Store<SettingsState>) {}

  public acknowledgeUpdate() {
    this.store.dispatch(SettingsActions.acknowledgeUpdate());
  }

  public setBoardWidth(size: number) {
    this.store.dispatch(SettingsActions.setBoardWidth({ size }));
  }

  public setBoardHeight(size: number) {
    this.store.dispatch(SettingsActions.setBoardHeight({ size }));
  }
}
