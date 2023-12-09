import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ScoreFacade } from '../../store/score.facade';

const SCORE_SOFTENER = 10_000;

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent implements OnInit {
  @Input() public width: number | null = null;
  @Input() public height: number | null = null;

  public score$: Observable<number> = this.scoreFacade.score$.pipe(map((score) => score / SCORE_SOFTENER));
  public timer$: Observable<Date> = this.scoreFacade.timer$;
  public steps$: Observable<number> = this.scoreFacade.steps$;

  constructor(private scoreFacade: ScoreFacade) {}

  public ngOnInit(): void {
    if (this.width && this.height) {
      this.score$ = this.scoreFacade.getScore(this.width, this.height).pipe(map((score) => (score ?? 0) / SCORE_SOFTENER));
    }
  }
}
