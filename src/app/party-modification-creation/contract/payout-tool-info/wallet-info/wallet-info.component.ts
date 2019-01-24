import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'cc-wallet-info',
    templateUrl: 'wallet-info.component.html'
})
export class WalletInfoComponent implements OnInit {
    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form.registerControl('walletID', this.fb.control(''));
    }
}
