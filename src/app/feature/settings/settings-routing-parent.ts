import type { Routes } from '@angular/router';
import { FrameComponent } from '@shared/frame/component/frame/frame.component';

export const SETTINGS_ROUTES: Routes = [
  {
    path: 'settings',
    component: FrameComponent,
    loadChildren: () => {
      return import('@feature/settings/settings.module').then((m) => {
        return m.SettingsModule;
      });
    },
  },
];
