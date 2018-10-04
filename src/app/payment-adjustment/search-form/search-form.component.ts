import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { SearchFormParams } from './search-form-params';

@Component({
    selector: 'cc-payment-adjustment-search-form',
    templateUrl: './search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {

    @Input()
    isLoading: boolean;

    @Output()
    search: EventEmitter<SearchFormParams> = new EventEmitter();

    @Output()
    change: EventEmitter<SearchFormParams> = new EventEmitter();

    form: FormGroup;

    constructor(private searchFormService: SearchFormService) {
    }

    ngOnInit() {
        const {form, formValueToSearchParams} = this.searchFormService;
        this.form = form;
        this.form.valueChanges.subscribe(() => this.change.emit(formValueToSearchParams(this.form.value)));
    }

    searchPayments() {
        this.search.emit(this.searchFormService.formValueToSearchParams(this.form.value));
    }
}
