import { TestBed } from '@angular/core/testing';

import { HmyserviceService } from './hmyservice.service';

describe('HmyserviceService', () => {
  let service: HmyserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HmyserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
