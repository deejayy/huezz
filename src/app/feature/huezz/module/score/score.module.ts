import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ScoreComponent } from './component/score/score.component';
import { ScoreFacade } from './store/score.facade';
import { scoreFeature } from './store/score.reducer';
import { ScoreEffects } from './store/store.effect';

@NgModule({
  declarations: [ScoreComponent],
  exports: [ScoreComponent],
  imports: [CommonModule, EffectsModule.forFeature(ScoreEffects), StoreModule.forFeature(scoreFeature)],
  providers: [ScoreFacade],
})
export class ScoreModule {}
