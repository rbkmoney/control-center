import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class CancelDialogService {
    createFormGroup: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createFormGroup = this.prepareForm();
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            reason: ['', Validators.required],
        });
    }
}
