import { TestBed, inject } from '@angular/core/testing';

import { SearchFormService } from './search-form.service';

describe('SearchFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchFormService]
    });
  });

  it('should be created', inject([SearchFormService], (service: SearchFormService) => {
    expect(service).toBeTruthy();
  }));
});
