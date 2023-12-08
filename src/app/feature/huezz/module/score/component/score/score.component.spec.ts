import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScoreFacade } from '../store/score.facade';
import { scoreFeature } from '../store/score.reducer';
import { StoreModule } from '@ngrx/store';

import { SettingsModule } from '@feature/blozz/module/settings/settings.module';
import { EffectsModule } from '@ngrx/effects';
import { ScoreComponent } from './score.component';

describe('ScoreComponent', () => {
  let component: ScoreComponent;
  let fixture: ComponentFixture<ScoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(), StoreModule.forFeature(scoreFeature), SettingsModule, EffectsModule.forRoot()],
      declarations: [ScoreComponent],
      providers: [ScoreFacade],
    });
    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
