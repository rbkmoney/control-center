import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

import { SearchFormParams } from './search-form-params';

@Injectable()
export class SearchFormService {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    formValueToSearchParams(value: any): SearchFormParams {
        const { fromTime, toTime } = value;
        return {
            ...value,
            fromTime: fromTime ? fromTime.startOf('day').toISOString() : '',
            toTime: toTime ? toTime.endOf('day').toISOString() : ''
        };
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            fromTime: [moment(), Validators.required],
            toTime: [moment(), Validators.required],
            partyId: '',
            shopId: '',
            invoicesIds: '',
            fromRevision: ['', Validators.required],
            toRevision: ['', Validators.required],
            status: 'captured',
            invoiceId: ''
        });
    }
}
