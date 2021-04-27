import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// eslint-disable-next-line you-dont-need-lodash-underscore/values
import values from 'lodash-es/values';
import * as moment from 'moment';

import { PayoutStatus, PayoutTypes } from '../../papi/model';

@Injectable()
export class SearchFormService {
    form: FormGroup;

    payoutStatuses: string[];

    payoutTypes: string[];

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
        this.payoutStatuses = values(PayoutStatus);
        this.payoutTypes = values(PayoutTypes);
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            type: '',
            status: PayoutStatus.paid,
            fromTime: [moment(), Validators.required],
            toTime: [moment(), Validators.required],
            payoutIds: '',
            currencyCode: '',
            minAmount: [0, [Validators.required, Validators.min(0)]],
            maxAmount: [1000000000, [Validators.required, Validators.min(0)]],
        });
    }
}
