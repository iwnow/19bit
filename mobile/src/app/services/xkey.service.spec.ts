import { TestBed, inject } from '@angular/core/testing';

import { XkeyService } from './xkey.service';

describe('XkeyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [XkeyService]
    });
  });

  it('should be created', inject([XkeyService], (service: XkeyService) => {
    expect(service).toBeTruthy();
  }));
});
