import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { SearchFormParams } from './search-form-params';

@Component({
    selector: 'cc-payment-adjustment-search-form',
    templateUrl: './search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Output()
    valueChanges: EventEmitter<SearchFormParams> = new EventEmitter();

    @Output()
    statusChanges: EventEmitter<string> = new EventEmitter();

    form: FormGroup;

    statuses: string[] = ['pending', 'processed', 'captured', 'cancelled', 'refunded', 'failed'];

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        const { form, formValueToSearchParams } = this.searchFormService;
        this.form = form;
        this.form.valueChanges.subscribe(value =>
            this.valueChanges.emit(formValueToSearchParams(value))
        );
        this.form.statusChanges.subscribe(status => this.statusChanges.emit(status));
    }
}
