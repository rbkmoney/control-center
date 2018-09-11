import { TestBed, inject } from '@angular/core/testing';

import { CaptureService } from './capture.service';

describe('CaptureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaptureService]
    });
  });

  it('should be created', inject([CaptureService], (service: CaptureService) => {
    expect(service).toBeTruthy();
  }));
});
