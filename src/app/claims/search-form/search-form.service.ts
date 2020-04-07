import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import isString from 'lodash-es/isString';
import mapValues from 'lodash-es/mapValues';
import values from 'lodash-es/values';

import { ClaimStatus } from '../../papi/model';
import { ClaimSearchParams } from '../../papi/params';

@Injectable()
export class SearchFormService {
    form: FormGroup;

    claimStatuses: string[];

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
        this.claimStatuses = values(ClaimStatus);
    }

    formValueToSearchParams(formValue): ClaimSearchParams {
        return mapValues(formValue, (value) => {
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
            claimStatus: 'pending',
            partyId: ''
        });
    }
}
