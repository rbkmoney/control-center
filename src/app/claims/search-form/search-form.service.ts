import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import mapValues from 'lodash-es/mapValues';
// eslint-disable-next-line you-dont-need-lodash-underscore/values
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
            } else if (typeof value === 'string') {
                result = value.trim();
            }
            return result;
        });
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            claimStatus: 'pending',
            partyId: '',
        });
    }
}
