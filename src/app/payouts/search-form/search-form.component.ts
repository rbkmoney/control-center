import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators';

import { SearchFormService } from './search-form.service';
import { PayoutSearchParams } from '../../papi/params';

@Component({
    selector: 'cc-payouts-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {

    @Output()
    valueChanges: EventEmitter<PayoutSearchParams> = new EventEmitter();

    form: FormGroup;

    payoutStatuses: string[];

    constructor(private searchFormService: SearchFormService) {}

    ngOnInit() {
        const {payoutStatuses, form, formValueToSearchParams} = this.searchFormService;
        this.form = form;
        this.payoutStatuses = payoutStatuses;
        this.form.valueChanges
            .pipe(debounceTime(300))
            .subscribe((value) =>
                this.valueChanges.emit(formValueToSearchParams(value)));
    }
}
