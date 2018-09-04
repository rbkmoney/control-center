import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class RussianBankAccountFormService {

    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.prepareForm();
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            account: [''],
            bankName: [''],
            bankPostAccount: [''],
            bankBik: ['']
        });
    }
}
