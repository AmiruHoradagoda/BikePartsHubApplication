import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesViewComponent } from './schedules-view.component';

describe('SchedulesViewComponent', () => {
  let component: SchedulesViewComponent;
  let fixture: ComponentFixture<SchedulesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchedulesViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedulesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
