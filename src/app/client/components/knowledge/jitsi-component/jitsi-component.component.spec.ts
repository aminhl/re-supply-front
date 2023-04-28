import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JitsiComponentComponent } from './jitsi-component.component';

describe('JitsiComponentComponent', () => {
  let component: JitsiComponentComponent;
  let fixture: ComponentFixture<JitsiComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JitsiComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JitsiComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
