import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { SearchFormService } from './search-form.service';
import { formValueToSearchParams } from './to-search-params';

@Component({
    selector: 'cc-payouts-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {

    @Output()
    valueChanges: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    debounceTime = 0;

    form: FormGroup;

    payoutStatuses: string[];

    constructor(private searchFormService: SearchFormService) {
    }

    ngOnInit() {
        const {payoutStatuses, form} = this.searchFormService;
        this.form = form;
        this.payoutStatuses = payoutStatuses;
        this.form.valueChanges
            .pipe(debounceTime(this.debounceTime))
            .subscribe((value) => this.valueChanges.emit(formValueToSearchParams(value)));
    }
}
