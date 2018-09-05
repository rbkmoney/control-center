import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import isString from 'lodash-es/isString';
import keys from 'lodash-es/keys';
import values from 'lodash-es/values';

import { PayoutSearchParams } from '../../papi/params';
import { PayoutStatus } from '../../papi/model';

@Injectable()
export class SearchFormService {

    form: FormGroup;

    payoutStatuses: string[];

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
        this.payoutStatuses = values(PayoutStatus);
    }

    formValueToSearchParams(formValues): PayoutSearchParams {
        const result = formValues;
        keys(formValues).forEach((key) => {
            if (key === 'fromTime' || key === 'toTime') {
                result[key] = result[key] ? moment(result[key]).startOf('day').utc().format() : null;
            }
            if (result[key] === '') {
                result[key] = null;
            } else if (isString(result[key])) {
                result[key] = result[key].trim();
                if (/,/g.test(result[key])) {
                    result[key] = result[key].replace(/\s/g, '').split(',');
                    if (result[key][result[key].length - 1] === '') {
                        result[key] = result[key].slice(0, -1).join(',');
                    }
                }
            }
        });
        return result;
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            payoutIds: '',
            status: '',
            fromTime: moment().subtract(1, 'weeks').utc().toDate(),
            toTime: moment().add(1, 'days').utc().toDate()
        });
    }
}
