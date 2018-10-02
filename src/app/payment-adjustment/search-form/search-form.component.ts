import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { SearchFormService } from './search-form.service';
import { PaymentAdjustmentService } from '../payment-adjustment.service';

@Component({
    selector: 'cc-payment-adjustment-search-form',
    templateUrl: './search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {

    form: FormGroup;

    constructor(private searchFormService: SearchFormService, private paymentAdjustmentService: PaymentAdjustmentService) {
    }

    ngOnInit() {
        const {form, formValueToSearchParams} = this.searchFormService;
        this.form = form;
        this.paymentAdjustmentService.fetchPayments(formValueToSearchParams());
        this.form.valueChanges
            .pipe(debounceTime(500))
            .subscribe((value) => this.paymentAdjustmentService.fetchPayments(formValueToSearchParams(value)));
    }
}
