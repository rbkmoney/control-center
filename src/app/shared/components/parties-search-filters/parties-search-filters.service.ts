import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { debounceTime, filter, shareReplay } from 'rxjs/operators';

import { PartiesSearchFiltersParams } from './parties-search-filters-params';

@Injectable()
export class PartiesSearchFiltersService {
    form = this.fb.group({
        searchText: '',
    });

    searchParamsChanged$ = this.form.valueChanges.pipe(
        debounceTime(600),
        filter(() => this.form.valid),
        shareReplay(1)
    );

    constructor(private fb: FormBuilder) {}

    init(params: PartiesSearchFiltersParams) {
        this.form.patchValue(params);
    }
}
