import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'cc-russian-bank-account',
    templateUrl: 'russian-bank-account.component.html'
})
export class RussianBankAccountComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        const control = () => this.fb.control('', Validators.required);
        this.form.addControl('account', control());
        this.form.addControl('bankName', control());
        this.form.addControl('bankPostAccount', control());
        this.form.addControl('bankBik', control());
    }
}
