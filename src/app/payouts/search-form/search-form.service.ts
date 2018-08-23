import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isString, keys, mapValues, values } from 'lodash-es';

import { PayoutSearchParams } from '../../papi/params';
import { PayoutStatus } from '../../papi/model';
import * as moment from 'moment';

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
            status: PayoutStatus.unpaid,
            fromTime: '',
            toTime: ''
        });
    }
}
