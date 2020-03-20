import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators';

import { SearchFormService } from './search-form.service';
import { SearchFormValue } from '../search-form-value';
import { ClaimStatus } from '../../../papi/model';
import { formValueToSearchParams } from './form-value-to-search-params';

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

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        const { claimStatuses, form } = this.searchFormService;
        this.claimStatuses = claimStatuses;
        this.form = form;
        this.form.valueChanges
            .pipe(debounceTime(300))
            .subscribe(value => this.valueChanges.emit(formValueToSearchParams(value)));
        this.form.patchValue({ statuses: [ClaimStatus.pending, ClaimStatus.review] });
    }
}
