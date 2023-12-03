import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HuezzComponent } from '@feature/huezz/component/huezz/huezz.component';

const subRoutes: Routes = [
  {
    path: '',
    component: HuezzComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(subRoutes)],
  exports: [RouterModule],
})
export class HuezzRoutingModule {}
