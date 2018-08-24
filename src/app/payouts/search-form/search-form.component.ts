import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/internal/operators';

import { SearchFormService } from './search-form.service';
import { PayoutsService } from '../../papi/payouts.service';

@Component({
    selector: 'cc-payouts-search-form',
    templateUrl: 'search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {

    form: FormGroup;

    payoutStatuses: string[];

    constructor(private searchFormService: SearchFormService,
                private payoutsService: PayoutsService) {
    }

    ngOnInit() {
        const {payoutStatuses, form, formValueToSearchParams} = this.searchFormService;
        this.form = form;
        this.payoutStatuses = payoutStatuses;
        this.payoutsService.getPayouts(formValueToSearchParams(form.value));
        this.form.valueChanges
            .pipe(debounceTime(600))
            .subscribe((value) => this.payoutsService.getPayouts(formValueToSearchParams(value)));
    }
}
