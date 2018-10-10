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
        const {status, fromTime, toTime, minAmount, maxAmount} = this.initSearchParams;
        return this.fb.group({
            payoutIds: '',
            status: status,
            fromTime: fromTime,
            toTime: toTime,
            currencyCode: '',
            minAmount: [minAmount / 100, [Validators.required, Validators.min(0)]],
            maxAmount: [maxAmount / 100, [Validators.required, Validators.min(0)]]
        });
    }
}
