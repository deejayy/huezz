import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SettingsModule } from '@feature/settings/settings.module';
import { HuezzComponent } from './component/huezz/huezz.component';
import { HuezzRoutingModule } from './huezz-routing.module';
import { ScoreModule } from './module/score/score.module';
import { ToRgbaPipe } from './pipe/to-rgba.pipe';

@NgModule({
  declarations: [HuezzComponent],
  imports: [CommonModule, HuezzRoutingModule, ToRgbaPipe, MatIconModule, MatBadgeModule, ScoreModule, SettingsModule, MatButtonModule],
})
export class HuezzModule {}
