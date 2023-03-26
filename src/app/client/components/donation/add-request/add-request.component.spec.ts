import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestComponent } from './add-request.component';

describe('AddRequestComponent', () => {
  let component: AddRequestComponent;
  let fixture: ComponentFixture<AddRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
