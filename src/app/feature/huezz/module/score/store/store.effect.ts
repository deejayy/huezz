import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { ScoreActions } from './score.action';

@Injectable()
export class ScoreEffects {
  public persistHighScore$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ScoreActions.resetScore),
        map((action) => {
          console.warn(action);
        }),
      ),
    { dispatch: false },
  );

  constructor(private actions$: Actions) {}
}
