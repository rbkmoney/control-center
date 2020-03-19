import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import values from 'lodash-es/values';
import mapValues from 'lodash-es/mapValues';
import isString from 'lodash-es/isString';

import { ClaimStatus } from '../../../papi/model';
import { SearchFormValue } from '../search-form-value';

@Injectable()
export class SearchFormService {
    form: FormGroup;

    claimStatuses: string[];

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
        this.claimStatuses = values(ClaimStatus);
    }

    formValueToSearchParams(formValue): SearchFormValue {
        return mapValues(formValue, value => {
            let result = value;
            if (value === '') {
                result = null;
            } else if (isString(value)) {
                result = value.trim();
            }
            return result;
        });
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            statuses: '',
            claim_id: ''
        });
    }
}
