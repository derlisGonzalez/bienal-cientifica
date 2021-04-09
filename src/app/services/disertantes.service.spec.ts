import { TestBed } from '@angular/core/testing';

import { DisertantesService } from './disertantes.service';

describe('DisertantesService', () => {
  let service: DisertantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisertantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
