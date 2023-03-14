import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordAfterSubmitEmailComponent } from './change-password-after-submit-email.component';

describe('ChangePasswordAfterSubmitEmailComponent', () => {
  let component: ChangePasswordAfterSubmitEmailComponent;
  let fixture: ComponentFixture<ChangePasswordAfterSubmitEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePasswordAfterSubmitEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordAfterSubmitEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
