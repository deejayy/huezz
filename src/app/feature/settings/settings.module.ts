import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SettingsComponent } from './component/settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsEffects } from './store/settings.effect';
import { SettingsFacade } from './store/settings.facade';
import { settingsFeature } from './store/settings.reducer';

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSlideToggleModule,
    RouterModule,
    MatSliderModule,
    EffectsModule.forFeature(SettingsEffects),
    StoreModule.forFeature(settingsFeature),
  ],
  providers: [SettingsFacade],
})
export class SettingsModule {}
