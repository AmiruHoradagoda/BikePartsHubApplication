import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSideNavbarComponent } from './admin-side-navbar.component';

describe('AdminSideNavbarComponent', () => {
  let component: AdminSideNavbarComponent;
  let fixture: ComponentFixture<AdminSideNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminSideNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSideNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
