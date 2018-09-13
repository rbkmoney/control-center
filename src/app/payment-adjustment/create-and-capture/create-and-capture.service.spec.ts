import { TestBed, inject } from '@angular/core/testing';

import { CreateAndCaptureService } from './create-and-capture.service';

describe('CreateAndCaptureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateAndCaptureService]
    });
  });

  it('should be created', inject([CreateAndCaptureService], (service: CreateAndCaptureService) => {
    expect(service).toBeTruthy();
  }));
});
