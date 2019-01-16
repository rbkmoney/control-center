import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class PartiesService {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            partyId: ['', Validators.required]
        });
    }
}
