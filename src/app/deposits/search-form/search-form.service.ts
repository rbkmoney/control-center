import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { SearchFormParams } from './search-form-params';

@Injectable()
export class SearchFormService {
    form = this.prepareForm();

    constructor(private fb: FormBuilder) {}

    formValueToSearchParams(value: any): SearchFormParams {
        const { fromTime, toTime, amountTo } = value;
        return {
            ...value,
            fromTime: fromTime ? fromTime.startOf('day').toISOString() : '',
            toTime: toTime ? toTime.endOf('day').toISOString() : '',
            amountTo: amountTo ? Math.round(amountTo * 100) : amountTo,
        };
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            fromTime: [moment().subtract(1, 'd'), Validators.required],
            toTime: [moment(), Validators.required],
            status: null,
            amountTo: ['', [Validators.pattern(/^\d+([\,\.]\d{1,2})?$/)]],
            currencyCode: '',
            depositId: '',
            identityId: '',
            partyId: '',
            sourceId: '',
            walletId: '',
        });
    }
}
