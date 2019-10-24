import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { CreateDepositService, CurrencySource } from './create-deposit.service';

@Component({
    selector: 'cc-create-deposit',
    templateUrl: 'create-deposit.component.html'
})
export class CreateDepositComponent implements OnInit {
    form: FormGroup;

    currencies: CurrencySource[];

    isLoading$: Observable<boolean>;

    constructor(
        private createDepositService: CreateDepositService,
        private dialogRef: MatDialogRef<CreateDepositComponent>
    ) {}

    ngOnInit() {
        this.form = this.createDepositService.getForm();
        this.currencies = this.createDepositService.getCurrencies();
        this.isLoading$ = this.createDepositService.isLoading$;
        this.dialogRef.afterClosed().subscribe(() => this.createDepositService.resetForm());
    }

    createDeposit() {
        this.createDepositService.createDeposit(this.dialogRef);
    }

    closeDialog() {
        this.dialogRef.close();
    }
}
