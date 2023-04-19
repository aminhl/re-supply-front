import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBlogsComponent } from './client-blogs.component';

describe('ClientBlogsComponent', () => {
  let component: ClientBlogsComponent;
  let fixture: ComponentFixture<ClientBlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientBlogsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
