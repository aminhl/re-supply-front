import { TestBed } from '@angular/core/testing';

import { ScheduleMeetingService } from './schedule-meeting.service';

describe('ScheduleMeetingService', () => {
  let service: ScheduleMeetingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleMeetingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
