import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-russian-legal-entity',
    templateUrl: 'russian-legal-entity.component.html'
})
export class RussianLegalEntityComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.setControl('russianLegalEntity', this.fb.group({
            registeredName: this.fb.control('', Validators.required),
            registeredNumber: this.fb.control('', Validators.required),
            inn: this.fb.control('', Validators.required),
            actualAddress: this.fb.control('', Validators.required),
            postAddress: this.fb.control('', Validators.required),
            representativePosition: this.fb.control('', Validators.required),
            representativeFullName: this.fb.control('', Validators.required),
            representativeDocument: this.fb.control('', Validators.required),
            russianBankAccount: this.fb.group({})
        }));
    }
}
