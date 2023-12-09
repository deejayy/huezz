import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter, interval, map, startWith, takeUntil } from 'rxjs';
import { ScoreActions } from './score.action';
import { scoreFeature } from './score.reducer';
import { ScoreState } from './score.state';

const MS_IN_SECOND = 1000;

@Injectable()
export class ScoreFacade {
  public score$: Observable<number> = this.store.select(scoreFeature.selectScore);
  public steps$: Observable<number> = this.store.select(scoreFeature.selectSteps);
  public timer$: Observable<Date> = combineLatest([
    this.store.select(scoreFeature.selectGameStart),
    interval(MS_IN_SECOND).pipe(startWith(true)),
  ]).pipe(
    takeUntil(this.store.select(scoreFeature.selectNotPlaying).pipe(filter(Boolean))),
    map(([gameStart]) => new Date(new Date().getTime() - gameStart.getTime())),
  );

  constructor(private store: Store<ScoreState>) {}

  public resetScore(): void {
    this.store.dispatch(ScoreActions.resetScore());
  }

  public startGame(startScore: number): void {
    this.store.dispatch(ScoreActions.startGame({ score: startScore }));
  }

  public endGame(multiplier: number): void {
    this.store.dispatch(ScoreActions.endGame({ multiplier }));
  }

  public addStep(): void {
    this.store.dispatch(ScoreActions.addStep());
  }
}
