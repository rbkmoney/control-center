import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
            status: '',
            fromTime: moment().subtract(1, 'weeks').utc().toDate(),
            toTime: moment().add(1, 'days').utc().toDate(),
            currencyCode: '',
            minAmount: '',
            maxAmount: ''
        });
    }
}
