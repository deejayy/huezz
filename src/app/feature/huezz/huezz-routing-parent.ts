import type { Routes } from '@angular/router';

export const HUEZZ_ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => {
      return import('@feature/huezz/huezz.module').then((m) => {
        return m.HuezzModule;
      });
    },
  },
];
