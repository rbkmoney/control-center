import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { isString, mapValues, values } from 'lodash-es';

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

    formValueToSearchParams(formValue): PayoutSearchParams {
        return mapValues(formValue, (value) => {
            let result = value;
            if (value === '') {
                result = null;
            } else if (isString(value)) {
                if (/,/g.test(value)) {
                    result = value.replace(/\s/g, '').split(',');
                    if (result[result.length - 1] === '') {
                        result = result.slice(0, -1);
                    }
                } else {
                    result = value.trim();
                }
            }
            return result;
        });
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            payoutIds: '',
            status: '',
            fromTime: '',
            toTime: ''
        });
    }
}
