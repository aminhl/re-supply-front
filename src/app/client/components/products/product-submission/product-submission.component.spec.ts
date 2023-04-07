import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubmissionComponent } from './product-submission.component';

describe('ProductSubmissionComponent', () => {
  let component: ProductSubmissionComponent;
  let fixture: ComponentFixture<ProductSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSubmissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
