import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsFacade } from '../../store/settings.facade';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  constructor(private settingsFacade: SettingsFacade) {
    this.settingsFacade.acknowledgeUpdate();
  }
}
