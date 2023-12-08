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

  constructor(private scoreFacade: ScoreFacade) {}
}
