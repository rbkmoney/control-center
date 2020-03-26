import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { SearchFormValue } from '../search-form-value';

@Component({
    selector: 'cc-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent {
    @Output()
    valueChanges: EventEmitter<SearchFormValue> = new EventEmitter();

    form: FormGroup;

    claimStatuses;

    constructor(private searchFormService: SearchFormService) {
        const { claimStatuses, form } = this.searchFormService;
        this.claimStatuses = claimStatuses;
        this.form = form;
        form.valueChanges.subscribe(v => {
            this.valueChanges.emit(v);
        });
    }
}
