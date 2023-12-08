import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ScoreActions } from './score.action';
import { scoreFeature } from './score.reducer';
import { ScoreState } from './score.state';

@Injectable()
export class ScoreFacade {
  public score$: Observable<number> = this.store.select(scoreFeature.selectScore);

  constructor(private store: Store<ScoreState>) {}

  public resetScore(): void {
    this.store.dispatch(ScoreActions.resetScore());
  }
}
