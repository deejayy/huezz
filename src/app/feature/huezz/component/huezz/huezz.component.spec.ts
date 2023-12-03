import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuezzComponent } from './huezz.component';

describe('HuezzComponent', () => {
  let component: HuezzComponent;
  let fixture: ComponentFixture<HuezzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HuezzComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HuezzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
