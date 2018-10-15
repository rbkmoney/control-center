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
        const {fromTime, toTime, partyId, invoicesIds, fromRevision, toRevision, status} = value;
        return {
            fromTime: moment(fromTime).startOf('day').utc().format(),
            toTime: moment(toTime).endOf('day').utc().format(),
            partyId,
            invoicesIds: invoicesIds ? invoicesIds.split(',').map((part) => part.trim()) : null,
            fromRevision,
            toRevision,
            status
        };
    }

    private prepareForm(): FormGroup {
        const defaultDate = [moment().utc().format(), Validators.required];
        return this.fb.group({
            fromTime: defaultDate,
            toTime: defaultDate,
            partyId: '',
            invoicesIds: '',
            fromRevision: [0, Validators.required],
            toRevision: [10, Validators.required],
            status: 'captured'
        });
    }
}
