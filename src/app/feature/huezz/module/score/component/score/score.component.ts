import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ScoreFacade } from '../../store/score.facade';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreComponent {
  public score$: Observable<number> = this.scoreFacade.score$;
  public timer$: Observable<Date> = this.scoreFacade.timer$;
  public steps$: Observable<number> = this.scoreFacade.steps$;

  constructor(private scoreFacade: ScoreFacade) {}
}
