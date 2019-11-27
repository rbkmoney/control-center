import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { debounceTime } from 'rxjs/internal/operators';
import { ClaimSearchQuery } from '../../gen-damsel/claim_management';

@Component({
    selector: 'cc-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Output()
    valueChanges: EventEmitter<ClaimSearchQuery> = new EventEmitter();

    form: FormGroup;

    claimStatuses: string[];

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        const { form, claimStatuses } = this.searchFormService;
        this.claimStatuses = claimStatuses;
        this.form = form;
        this.form.valueChanges.pipe(debounceTime(300)).subscribe(value => {
            this.valueChanges.emit(value);
        });
    }
}
