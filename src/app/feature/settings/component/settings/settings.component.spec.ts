import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterTestingModule } from '@angular/router/testing';
import { SettingsFacade } from '../../store/settings.facade';
import { settingsFeature } from '../../store/settings.reducer';
import { StoreModule } from '@ngrx/store';
import { SettingsComponent } from './settings.component';
import { MatRadioModule } from '@angular/material/radio';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(settingsFeature),
        MatIconModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatRadioModule,
        RouterTestingModule,
      ],
      declarations: [SettingsComponent],
      providers: [SettingsFacade],
    });
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
