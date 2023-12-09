import { createAction, props } from '@ngrx/store';

export class ScoreActions {
  public static resetScore = createAction('[Score] Reset Score');
  public static startGame = createAction('[Score] Start Game');
  public static endGame = createAction('[Score] End Game', props<{ multiplier: number }>());
  public static addStep = createAction('[Score] Add Step');
}
