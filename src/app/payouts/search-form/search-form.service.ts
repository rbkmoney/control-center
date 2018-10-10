import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import values from 'lodash-es/values';

import { PayoutStatus } from '../../papi/model';
import { PayoutSearchParams } from '../../papi/params';

@Injectable()
export class SearchFormService {

    form: FormGroup;

    payoutStatuses: string[];

    initSearchParams: PayoutSearchParams = {
        fromTime: moment().startOf('day').utc().format(),
        toTime: moment().add(1, 'days').startOf('day').utc().format(),
        minAmount: 0,
        maxAmount: 100000000000,
        status: PayoutStatus.paid
    };

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
        this.payoutStatuses = values(PayoutStatus);
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            payoutIds: '',
            status: this.initSearchParams.status,
            fromTime: this.initSearchParams.fromTime,
            toTime: this.initSearchParams.toTime,
            currencyCode: '',
            minAmount: [this.initSearchParams.minAmount / 100, [Validators.required, Validators.min(0)]],
            maxAmount: [this.initSearchParams.maxAmount / 100, [Validators.required, Validators.min(0)]]
        });
    }
}
