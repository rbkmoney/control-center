import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CreateWithdrawalService } from './create-withdrawal.service';
import { Withdrawal } from '../../wapi/model';

@Component({
    selector: 'cc-create-withdrawal',
    templateUrl: 'create-withdrawal.component.html'
})
export class CreateWithdrawalComponent implements OnInit {
    form: FormGroup;

    isLoading = false;

    withdrawal: Withdrawal;

    constructor(
        private createWithdrawalService: CreateWithdrawalService,
        private snackBar: MatSnackBar,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            wallet: ['', Validators.required],
            destination: ['', Validators.required],
            amount: ['', Validators.required],
            currency: ['RUB', Validators.required]
        });
    }

    createWithdrawal() {
        this.isLoading = true;
        console.log(this.form.value);
        this.createWithdrawalService.createWithdrawal(this.form.value).subscribe(
            (withdrawal) => {
                this.isLoading = false;
                this.withdrawal = withdrawal;
                this.snackBar.open('Withdrawal successfully created', 'OK', { duration: 3000 });
            },
            (e) => {
                this.isLoading = false;
                this.snackBar.open('An error occurred while withdrawal create', 'OK');
                console.error(e);
            }
        );
    }

}
