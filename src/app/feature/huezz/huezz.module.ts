import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HuezzComponent } from './component/huezz/huezz.component';
import { HuezzRoutingModule } from './huezz-routing.module';
import { ToRgbaPipe } from './pipe/to-rgba.pipe';

@NgModule({
  declarations: [HuezzComponent],
  imports: [CommonModule, HuezzRoutingModule, ToRgbaPipe],
})
export class HuezzModule {}
