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
            party_id: ['7eb065b9-787a-41bd-a29b-e93c9e8fbb19', Validators.required]
        });
    }
}
