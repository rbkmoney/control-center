import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import values from 'lodash-es/values';

import { ClaimStatus } from '../../../papi/model/claim-statuses';

@Injectable()
export class SearchFormService {
    form: FormGroup;

    claimStatuses: string[];

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
        this.claimStatuses = values(ClaimStatus);
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            statuses: '',
            party_id: ''
        });
    }
}
