import { TestBed } from '@angular/core/testing';

import { TalesService } from './tales.service';

describe('TalesService', () => {
  let service: TalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
