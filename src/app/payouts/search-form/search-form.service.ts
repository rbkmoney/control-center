import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import values from 'lodash-es/values';

import { PayoutStatus } from '../../papi/model';

@Injectable()
export class SearchFormService {

    form: FormGroup;

    payoutStatuses: string[];

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
        this.payoutStatuses = values(PayoutStatus);
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            status: PayoutStatus.paid,
            fromTime: [moment(), Validators.required],
            toTime: [moment(), Validators.required],
            payoutIds: '',
            currencyCode: '',
            minAmount: [0, [Validators.required, Validators.min(0)]],
            maxAmount: [1000000000, [Validators.required, Validators.min(0)]]
        });
    }
}
