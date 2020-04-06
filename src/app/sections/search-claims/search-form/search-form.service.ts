import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class SearchFormService {
    form: FormGroup;

    claimStatuses: string[] = [
        'Pending',
        'Review',
        'Accepted',
        'Denied',
        'Revoked',
        'Pending Acceptance'
    ];

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            statuses: '',
            party_id: '',
            claim_id: undefined
        });
    }
}
