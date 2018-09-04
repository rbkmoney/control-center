import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RussianBankAccountFormService } from './russian-bank-account-form/russian-bank-account-form.service';

@Injectable()
export class RussianLegalEntityFormService {

    form: FormGroup;

    constructor(private fb: FormBuilder,
                private russianBankAccountFormService: RussianBankAccountFormService) {
        this.form = this.prepareForm();
    }

    private prepareForm(): FormGroup {
        return this.fb.group({
            registeredName: [''],
            registeredNumber: [''],
            inn: [''],
            actualAddress: [''],
            postAddress: [''],
            representativePosition: [''],
            representativeFullName: [''],
            representativeDocument: [''],
            russianBankAccount: this.russianBankAccountFormService.form
        });
    }
}
