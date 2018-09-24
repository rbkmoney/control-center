import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class CreateAndCaptureService {

    createPaymentAdjustmentGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createPaymentAdjustmentGroup = this.prepareForm();
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            revision: ['', Validators.required],
            reason: ['', Validators.required]
        });
    }
}
