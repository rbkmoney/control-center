import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import * as uuid from 'uuid';

@Component({
    selector: 'cc-wallet-info',
    templateUrl: 'wallet-info.component.html'
})
export class WalletInfoComponent implements OnInit {

    @Input()
    form: FormGroup;

    isBankDetails = false;

    isCorrespondentAccount = false;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit() {
        this.form.registerControl('walletID', this.fb.control(''));
    }

    detailsChange(change: MatCheckboxChange) {
        this.isBankDetails = change.checked;
        change.checked
            ? this.form.registerControl('bank', this.fb.group({}))
            : this.form.removeControl('bank');
    }

    accountChange(change: MatCheckboxChange) {
        this.isCorrespondentAccount = change.checked;
        change.checked
            ? this.form.registerControl('correspondentAccount', this.fb.group({}))
            : this.form.removeControl('correspondentAccount');
    }

    generate() {
        this.form.patchValue({walletID: uuid()});
    }
}
