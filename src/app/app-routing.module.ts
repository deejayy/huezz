import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HUEZZ_ROUTES } from '@feature/huezz/huezz-routing-parent';
import { SETTINGS_ROUTES } from '@feature/settings/settings-routing-parent';

const routes: Routes = [...HUEZZ_ROUTES, ...SETTINGS_ROUTES];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
