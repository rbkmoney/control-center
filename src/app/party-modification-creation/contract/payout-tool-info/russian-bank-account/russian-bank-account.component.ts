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
        this.form.registerControl('account', control());
        this.form.registerControl('bankName', control());
        this.form.registerControl('bankPostAccount', control());
        this.form.registerControl('bankBik', control());
    }
}
