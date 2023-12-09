import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { ScoreActions } from './score.action';
import { ScoreState } from './score.state';
import { scoreFeature } from './score.reducer';

@Injectable()
export class ScoreEffects {
  public persistHighScore$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScoreActions.endGame),
        switchMap(() => this.store.select(scoreFeature.selectHighScore)),
        map((highScores) => {
          localStorage.setItem('highScores', JSON.stringify(highScores));
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions, private store: Store<ScoreState>) {}
}
