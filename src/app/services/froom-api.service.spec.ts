import { TestBed } from '@angular/core/testing';

import { FroomApiService } from './froom-api.service';

describe('FroomApiService', () => {
  let service: FroomApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FroomApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
