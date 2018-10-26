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
        const {fromTime, toTime, partyId, fromRevision, toRevision, status, shopId, invoiceId} = value;
        return {
            fromTime: moment(fromTime).startOf('day').utc().format(),
            toTime: moment(toTime).endOf('day').utc().format(),
            partyId,
            fromRevision,
            toRevision,
            status,
            shopId,
            invoiceId
        };
    }

    private prepareForm(): FormGroup {
        const defaultDate = [moment().utc().format(), Validators.required];
        return this.fb.group({
            fromTime: defaultDate,
            toTime: defaultDate,
            partyId: '24b0768d-fa41-427a-b034-8a8d6be8f397',
            shopId: '',
            invoicesIds: '',
            fromRevision: ['0', Validators.required],
            toRevision: ['9999', Validators.required],
            status: 'captured',
            invoiceId: ''
        });
    }
}
