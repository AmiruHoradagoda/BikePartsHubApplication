import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCustomerViewComponent } from './admin-customer-view.component';

describe('AdminCustomerViewComponent', () => {
  let component: AdminCustomerViewComponent;
  let fixture: ComponentFixture<AdminCustomerViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminCustomerViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminCustomerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
