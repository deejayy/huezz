import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SettingsFacade } from '../../store/settings.facade';

const DIFFICULTY_BASE = 10;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  public difficulty$: Observable<number> = this.settingsFacade.difficulty$.pipe(map((v) => DIFFICULTY_BASE - v + 1));
  public width$: Observable<number> = this.settingsFacade.boardWidth$;
  public height$: Observable<number> = this.settingsFacade.boardHeight$;

  constructor(private settingsFacade: SettingsFacade) {
    this.settingsFacade.acknowledgeUpdate();
  }

  public changeDifficulty(value: string) {
    this.settingsFacade.setDifficulty(DIFFICULTY_BASE - parseInt(value) + 1);
  }

  public changeWidth(value: string) {
    this.settingsFacade.setBoardWidth(parseInt(value));
  }

  public changeHeight(value: string) {
    this.settingsFacade.setBoardHeight(parseInt(value));
  }
}
