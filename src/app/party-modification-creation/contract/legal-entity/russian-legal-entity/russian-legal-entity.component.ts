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
        const control = () => this.fb.control('', Validators.required);
        this.form.registerControl('registeredName', control());
        this.form.registerControl('registeredNumber', control());
        this.form.registerControl('inn', control());
        this.form.registerControl('actualAddress', control());
        this.form.registerControl('postAddress', control());
        this.form.registerControl('representativePosition', control());
        this.form.registerControl('representativeFullName', control());
        this.form.registerControl('representativeDocument', control());
        this.form.registerControl('russianBankAccount', this.fb.group({}));
    }
}
