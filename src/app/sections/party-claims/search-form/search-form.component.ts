import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, map, tap } from 'rxjs/internal/operators';

import { SearchFormService } from './search-form.service';
import { SearchFormValue } from '../search-form-value';
import { formValueToSearchParams } from '../../../shared/utils';

@Component({
    selector: 'cc-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Output()
    valueChanges: EventEmitter<SearchFormValue> = new EventEmitter();

    form: FormGroup;

    claimStatuses: string[];

    constructor(private searchFormService: SearchFormService) {
    }

    ngOnInit() {
        const { claimStatuses, form } = this.searchFormService;
        this.claimStatuses = claimStatuses;
        this.form = form;
        this.form.valueChanges
            .pipe(
                debounceTime(300),
                map(v => formValueToSearchParams<SearchFormValue>(v)),
            )
            .subscribe(v => this.valueChanges.emit(v));
    }
}
