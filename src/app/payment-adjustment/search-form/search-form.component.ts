import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PaymentAdjustmentService } from '../payment-adjustment.service';
import { SearchFormParams } from './search-form-params';
import { SearchFormService } from './search-form.service';

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

    get version() {
        return this.paymentAdjustmentService.version;
    }

    constructor(
        private searchFormService: SearchFormService,
        private paymentAdjustmentService: PaymentAdjustmentService
    ) {}

    ngOnInit() {
        const { form, formValueToSearchParams } = this.searchFormService;
        this.form = form;
        this.form.valueChanges.subscribe(value =>
            this.valueChanges.emit(formValueToSearchParams(value))
        );
        this.form.statusChanges.subscribe(status => this.statusChanges.emit(status));
    }
}
