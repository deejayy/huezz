import { createAction } from '@ngrx/store';

export class ScoreActions {
  public static resetScore = createAction('[Score] Reset Score');
}
