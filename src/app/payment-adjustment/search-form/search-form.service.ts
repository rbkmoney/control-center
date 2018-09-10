import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import values from 'lodash-es/values';
import keys from 'lodash-es/keys';

import { PayoutStatus } from '../../papi/model';
import { ReportSearchParams } from '../../papi/params';

@Injectable({
    providedIn: 'root'
})
export class SearchFormService {

    form: FormGroup;

    payoutStatuses: string[];

    initFormValues = {
        fromTime: moment().subtract(1, 'weeks').utc().toDate(),
        toTime: moment().add(1, 'days').utc().toDate()
    };

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
        this.payoutStatuses = values(PayoutStatus);
    }

    formValueToSearchParams = (formValues = this.form.value): ReportSearchParams => {
        const result: ReportSearchParams = {from: 0, size: 1000} as any;
        keys(formValues).forEach((key) => {
            if (key === 'fromTime' || key === 'toTime') {
                result[key] = formValues[key] ? moment(formValues[key]).startOf('day').utc().format() : null;
            }
        });
        return result;
    }

    private prepareForm(): FormGroup {
        return this.fb.group(this.initFormValues);
    }
}
