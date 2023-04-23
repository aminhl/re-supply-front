import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesManagementComponent } from './resources-management.component';

describe('ResourcesManagementComponent', () => {
  let component: ResourcesManagementComponent;
  let fixture: ComponentFixture<ResourcesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
