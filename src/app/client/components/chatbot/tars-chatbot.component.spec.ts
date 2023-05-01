import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarsChatbotComponent } from './tars-chatbot.component';

describe('TarsChatbotComponent', () => {
  let component: TarsChatbotComponent;
  let fixture: ComponentFixture<TarsChatbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarsChatbotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarsChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
