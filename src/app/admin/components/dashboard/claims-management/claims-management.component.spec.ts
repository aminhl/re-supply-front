import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimsManagementComponent } from './claims-management.component';

describe('ClaimsManagementComponent', () => {
  let component: ClaimsManagementComponent;
  let fixture: ComponentFixture<ClaimsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
