import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

import { CreateDepositService, currencies } from './services/create-deposit/create-deposit.service';

@Component({
    templateUrl: 'create-deposit-dialog.component.html',
    styleUrls: ['create-deposit-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateDepositService],
})
export class CreateDepositDialogComponent implements OnInit {
    form: FormGroup;

    currencies = currencies;

    depositCreated$ = this.createDepositService.depositCreated$;
    isLoading$ = this.createDepositService.isLoading$;
    error$ = this.createDepositService.error$;
    pollingError$ = this.createDepositService.pollingError$;

    constructor(
        private createDepositService: CreateDepositService,
        private snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<CreateDepositDialogComponent>
    ) {}

    ngOnInit() {
        this.form = this.createDepositService.form;
        this.dialogRef
            .afterClosed()
            .subscribe(() => this.form.reset({ currency: this.currencies[0] }));
        this.depositCreated$.subscribe((deposit) => {
            this.snackBar.open(`Deposit status successfully created`, 'OK', { duration: 3000 });
            this.dialogRef.close(deposit);
            this.form.enable();
        });
        this.error$.subscribe((e) => {
            console.error(e);
            this.snackBar.open('An error occurred while deposit create', 'OK');
            this.dialogRef.close();
            this.form.enable();
        });
        this.pollingError$.subscribe((e) => {
            console.error(e);
            this.snackBar.open('Polling timeout error', 'OK');
            this.dialogRef.close();
            this.form.enable();
        });
    }

    createDeposit() {
        this.form.disable();
        this.createDepositService.createDeposit();
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
