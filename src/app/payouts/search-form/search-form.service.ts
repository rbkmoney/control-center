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
            payoutIds: '',
            status: PayoutStatus.paid,
            fromTime: moment().startOf('day').utc().format(),
            toTime: moment().add(1, 'days').startOf('day').utc().format(),
            currencyCode: '',
            minAmount: [0, [Validators.required, Validators.min(0)]],
            maxAmount: [1000000000, [Validators.required, Validators.min(0)]]
        });
    }
}
