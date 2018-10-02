import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';

import { SearchFormParams } from './search-form-params';

const initFormValues = {
    fromTime: moment().subtract(1, 'months').utc().toDate(),
    toTime: moment().add(1, 'days').utc().toDate(),
    partyId: '',
    invoicesIds: '',
    fromRevision: '',
    toRevision: ''
};

@Injectable()
export class SearchFormService {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    formValueToSearchParams({fromTime, toTime, partyId, invoicesIds, fromRevision, toRevision} = this.form.value): SearchFormParams {
        return {
            fromTime: moment(fromTime).startOf('day').utc().format(),
            toTime: moment(toTime).startOf('day').utc().format(),
            partyId,
            invoicesIds: invoicesIds.split(',').map((part) => part.trim()),
            fromRevision,
            toRevision
        };
    }

    private prepareForm(): FormGroup {
        return this.fb.group(initFormValues);
    }
}
