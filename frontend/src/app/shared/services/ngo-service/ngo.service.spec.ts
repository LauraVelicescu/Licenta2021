import { TestBed } from '@angular/core/testing';

import { NGOService } from './ngo.service';

describe('NGOService', () => {
  let service: NGOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NGOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
