import { TestBed, async, inject } from '@angular/core/testing';

import { FacadeGuard } from './facade.guard';

describe('FacadeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacadeGuard]
    });
  });

  it('should ...', inject([FacadeGuard], (guard: FacadeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
