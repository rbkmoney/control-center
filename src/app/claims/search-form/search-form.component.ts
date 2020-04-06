import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators';

import { ClaimSearchParams } from '../../papi/params';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'cc-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Output()
    valueChanges: EventEmitter<ClaimSearchParams> = new EventEmitter();

    form: FormGroup;

    claimStatuses: string[];

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        const { claimStatuses, form, formValueToSearchParams } = this.searchFormService;
        this.claimStatuses = claimStatuses;
        this.form = form;
        this.form.valueChanges
            .pipe(debounceTime(300))
            .subscribe(value => this.valueChanges.emit(formValueToSearchParams(value)));
    }
}
