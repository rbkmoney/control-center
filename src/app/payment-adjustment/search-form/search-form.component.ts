import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SearchFormService } from './search-form.service';
import { PaymentAdjustmentService } from '../payment-adjustment.service';

@Component({
    selector: 'cc-payment-adjustment-search-form',
    templateUrl: './search-form.component.html',
    providers: [SearchFormService]
})
export class SearchFormComponent implements OnInit {

    form: FormGroup;

    fetchPayments: () => any;

    @Input()
    isLoading: boolean;

    constructor(private searchFormService: SearchFormService, private paymentAdjustmentService: PaymentAdjustmentService) {
    }

    ngOnInit() {
        const {form, formValueToSearchParams} = this.searchFormService;
        this.form = form;
        this.fetchPayments = () => this.paymentAdjustmentService.fetchPayments(formValueToSearchParams());
        this.form.valueChanges.subscribe(() => this.paymentAdjustmentService.clearPayments());
    }
}
