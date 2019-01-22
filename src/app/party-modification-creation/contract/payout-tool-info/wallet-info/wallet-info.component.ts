import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as uuid from 'uuid';

@Component({
    selector: 'cc-wallet-info',
    templateUrl: 'wallet-info.component.html'
})
export class WalletInfoComponent implements OnInit {

    @Input()
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.registerControl('walletID', this.fb.control(''));
    }

    generate() {
        this.form.patchValue({walletID: uuid()});
    }
}
