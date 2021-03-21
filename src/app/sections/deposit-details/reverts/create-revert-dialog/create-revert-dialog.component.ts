import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CreateRevertService } from './services/create-revert/create-revert.service';

@Component({
    templateUrl: 'create-revert-dialog.component.html',
    styleUrls: ['create-revert-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [CreateRevertService],
})
export class CreateRevertDialogComponent implements OnInit {
    form: FormGroup;

    depositCreated$ = this.createDepositService.depositCreated$;
    isLoading$ = this.createDepositService.isLoading$;
    error$ = this.createDepositService.error$;
    pollingError$ = this.createDepositService.pollingError$;

    constructor(
        @Inject(MAT_DIALOG_DATA) private currency: string,
        private createDepositService: CreateRevertService,
        private snackBar: MatSnackBar,
        private dialogRef: MatDialogRef<CreateRevertDialogComponent>
    ) {}

    ngOnInit() {
        this.createDepositService.initForm(this.currency);
        this.form = this.createDepositService.form;
        this.dialogRef.afterClosed().subscribe(() => this.form.reset());
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
