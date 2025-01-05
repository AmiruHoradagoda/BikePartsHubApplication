import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboadComponent } from './user-dashboad.component';

describe('UserDashboadComponent', () => {
  let component: UserDashboadComponent;
  let fixture: ComponentFixture<UserDashboadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDashboadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDashboadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
