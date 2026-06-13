import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminScheduleViewComponent } from './admin-schedule-view.component';

describe('AdminScheduleViewComponent', () => {
  let component: AdminScheduleViewComponent;
  let fixture: ComponentFixture<AdminScheduleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminScheduleViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminScheduleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
