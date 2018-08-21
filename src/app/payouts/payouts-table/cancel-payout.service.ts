import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class CancelPayoutService {
    public createPayoutGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createPayoutGroup = this.prepareForm();
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            reason: ['', Validators.required]
        });
    }
}
