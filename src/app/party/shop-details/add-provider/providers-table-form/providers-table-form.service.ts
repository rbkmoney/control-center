import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class ProvidersTableFormService {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareProviderForm();
    }

    private prepareProviderForm(): FormGroup {
        return this.fb.group({
            id: ['', Validators.required]
        });
    }
}
