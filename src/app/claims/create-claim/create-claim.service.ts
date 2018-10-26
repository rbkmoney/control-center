import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class CreateClaimService {
    createClaimGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createClaimGroup = this.prepareForm();
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            partyId: ['', Validators.required]
        });
    }
}
