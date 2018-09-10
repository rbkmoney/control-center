import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import keys from 'lodash-es/keys';

import { ReportSearchParams } from '../../papi/params';

const initFormValues = {
    fromTime: moment().subtract(1, 'weeks').utc().toDate(),
    toTime: moment().add(1, 'days').utc().toDate(),
    partyId: ''
};

@Injectable({
    providedIn: 'root'
})
export class SearchFormService {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    formValueToSearchParams = (formValues = this.form.value): ReportSearchParams => {
        const result: ReportSearchParams = {from: 0, size: 1000} as any;
        keys(formValues).forEach((key: keyof typeof initFormValues) => {
            if (formValues[key]) {
                switch (key) {
                    case 'fromTime':
                    case 'toTime':
                        result[key] = moment(formValues[key]).startOf('day').utc().format();
                        break;
                    case 'partyId':
                        result.merchantId = formValues[key];
                        break;
                }
            }
        });
        return result;
    }

    private prepareForm(): FormGroup {
        return this.fb.group(initFormValues);
    }
}
