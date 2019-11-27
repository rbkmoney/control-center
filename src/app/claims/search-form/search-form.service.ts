import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import values from 'lodash-es/values';

import { ClaimStatus } from '../../papi/model/claim-statuses';

@Injectable()
export class SearchFormService {
    form: FormGroup;

    claimStatuses: string[];

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
        this.claimStatuses = values(ClaimStatus);
        this.form.patchValue({ statuses: [ClaimStatus.pending] });
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            statuses: '',
            party_id: ['0369a0e7-70fb-4c04-9ac1-97068df65815', Validators.required]
        });
    }
}
