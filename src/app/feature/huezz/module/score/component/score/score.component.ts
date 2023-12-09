import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ScoreFacade } from '../../store/score.facade';

const SCORE_SOFTENER = 10_000;

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent {
  public score$: Observable<number> = this.scoreFacade.score$.pipe(map((score) => score / SCORE_SOFTENER));
  public timer$: Observable<Date> = this.scoreFacade.timer$;
  public steps$: Observable<number> = this.scoreFacade.steps$;

  constructor(private scoreFacade: ScoreFacade) {}
}
