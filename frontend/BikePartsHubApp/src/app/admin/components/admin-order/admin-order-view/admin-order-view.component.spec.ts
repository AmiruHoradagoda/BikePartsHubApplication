import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderViewComponent } from './admin-order-view.component';

describe('AdminOrderViewComponent', () => {
  let component: AdminOrderViewComponent;
  let fixture: ComponentFixture<AdminOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminOrderViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
