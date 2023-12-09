// eslint-disable-next-line max-classes-per-file
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveConfigModule } from '@deejayy/reactive-config';
import { RuntimeLocalizerModule } from '@deejayy/runtime-localizer';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FrameModule } from '@shared/frame/frame.module';

import { scoreMetaReducer, scoreReducer } from '@feature/huezz/module/score/store/score.reducer';
import { settingsMetaReducer, settingsReducer } from '@feature/settings/store/settings.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export class ConfigVars {
  public apiUrl!: string;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    FrameModule,
    StoreModule.forRoot({ settings: settingsReducer, score: scoreReducer }, { metaReducers: [settingsMetaReducer, scoreMetaReducer] }),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'Huezz',
      maxAge: 200,
      logOnly: environment.production,
    }),
    ReactiveConfigModule.forRoot(ConfigVars, { configPath: environment.config }),
    RuntimeLocalizerModule.forRoot([
      {
        lang: 'en-US',
        path: '/assets/messages/messages.en-US.json',
      },
      {
        lang: 'hu-HU',
        path: '/assets/messages/messages.hu-HU.json',
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
