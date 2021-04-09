import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AppAuthGuardService, DepositRole } from '@cc/app/shared/services';

import { currencies } from '../constants/currencies';
import { CreateDepositService } from './services/create-deposit/create-deposit.service';

@UntilDestroy()
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
    pollingTimeout$ = this.createDepositService.pollingTimeout$;

    constructor(
        private createDepositService: CreateDepositService,
        private snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<CreateDepositDialogComponent>,
        private authGuardService: AppAuthGuardService
    ) {}

    ngOnInit() {
        this.form = this.createDepositService.form;
        this.dialogRef
            .afterClosed()
            .pipe(untilDestroyed(this))
            .subscribe(() => this.form.reset({ currency: this.currencies[0] }));
        this.depositCreated$.subscribe((deposit) => {
            this.snackBar.open(`Deposit status successfully created`, 'OK', { duration: 3000 });
            this.dialogRef.close(deposit);
            this.form.enable();
        });
        this.error$.pipe(untilDestroyed(this)).subscribe(() => {
            this.snackBar.open('An error occurred while deposit create', 'OK');
            this.dialogRef.close();
            this.form.enable();
        });
        this.pollingError$.pipe(untilDestroyed(this)).subscribe(() => {
            this.snackBar.open('An error occurred while deposit polling', 'OK');
            this.dialogRef.close();
            this.form.enable();
        });
        this.pollingTimeout$.pipe(untilDestroyed(this)).subscribe(() => {
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

    hasNecessaryRole(): boolean {
        return this.authGuardService.userHasRoles([DepositRole.Write]);
    }
}
