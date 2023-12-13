import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter, interval, map, startWith } from 'rxjs';
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
    this.store.select(scoreFeature.selectPlaying),
    interval(MS_IN_SECOND).pipe(startWith(true)),
  ]).pipe(
    filter(([, playing]) => playing),
    map(([gameStart]) => new Date(new Date().getTime() - gameStart.getTime())),
  );

  constructor(private store: Store<ScoreState>) {}

  public getScore(width: number, height: number): Observable<number | undefined> {
    return this.store.select(scoreFeature.selectBestScore(width, height));
  }

  public resetScore(): void {
    this.store.dispatch(ScoreActions.resetScore());
  }

  public startGame(startScore: number): void {
    this.store.dispatch(ScoreActions.startGame({ score: startScore }));
  }

  public endGame(multiplier: number, width: number, height: number): void {
    this.store.dispatch(ScoreActions.endGame({ multiplier, width, height }));
  }

  public addStep(multiplier: number): void {
    this.store.dispatch(ScoreActions.addStep({ multiplier }));
  }
}
