import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { currencies } from '../deposits-table/deposits-table.service';
import { SearchFormParams } from './search-form-params';
import { SearchFormService } from './search-form.service';

@Component({
    selector: 'cc-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {
    @Output()
    valueChanges: EventEmitter<SearchFormParams> = new EventEmitter();

    @Output()
    statusChanges: EventEmitter<string> = new EventEmitter();

    form: FormGroup;

    depositStatuses = ['Pending', 'Succeeded', 'Failed'];

    currencies = currencies;

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        this.form = this.searchFormService.form;
        this.form.valueChanges.subscribe((value) => {
            this.valueChanges.emit(this.searchFormService.formValueToSearchParams(value));
        });
        this.form.statusChanges.subscribe((status) => this.statusChanges.emit(status));
        this.form.updateValueAndValidity();
    }
}
