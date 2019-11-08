import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { CreateDepositService, currencies } from './create-deposit.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { depositStatus } from '../deposit-status';

@Component({
    selector: 'cc-create-deposit',
    templateUrl: 'create-deposit.component.html'
})
export class CreateDepositComponent implements OnInit {
    form: FormGroup;

    currencies = currencies;

    isLoading = false;

    constructor(
        private createDepositService: CreateDepositService,
        private snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<CreateDepositComponent>
    ) {}

    ngOnInit() {
        this.form = this.createDepositService.form;
        this.dialogRef
            .afterClosed()
            .subscribe(() => this.form.reset({ currency: this.currencies[0] }));
    }

    createDeposit() {
        this.isLoading = true;
        this.form.disable();
        this.createDepositService.createDeposit().subscribe(
            () => {
                this.isLoading = false;
                this.form.enable();
                this.snackBar.open(`Deposit status successfully created`, 'OK', { duration: 3000 });
                this.dialogRef.close();
            },
            e => {
                console.error(e);
                this.isLoading = false;
                this.form.enable();
                this.snackBar.open('An error occurred while deposit create', 'OK');
                this.dialogRef.close();
            }
        );
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
