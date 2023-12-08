import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './component/settings/settings.component';

const subRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(subRoutes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
