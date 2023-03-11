import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCComponent } from './main-c.component';

describe('MainCComponent', () => {
  let component: MainCComponent;
  let fixture: ComponentFixture<MainCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
