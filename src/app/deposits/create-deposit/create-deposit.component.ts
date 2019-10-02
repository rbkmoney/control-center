import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CreateDepositService } from './create-deposit.service';
import { Deposit, DepositParams } from '../../fistful/gen-model/fistful';

@Component({
    selector: 'cc-create-deposit',
    templateUrl: 'create-deposit.component.html'
})
export class CreateDepositComponent implements OnInit {
    form: FormGroup;

    isLoading = false;

    deposit: Deposit;

    constructor(
        private createDepositService: CreateDepositService,
        private snackBar: MatSnackBar,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            source: ['3', Validators.required],
            destination: ['859', Validators.required],
            amount: ['1', Validators.required],
            currency: ['RUB', Validators.required]
        });
    }

    createDeposit() {
        this.isLoading = true;
        const { source, destination, amount, currency } = this.form.value;
        const params: DepositParams = {
            id: 'e1',
            source,
            destination,
            body: {
                amount,
                currency: {
                    symbolic_code: currency
                }
            }
        };

        this.createDepositService.createDeposit(params).subscribe(
            () => {
                this.isLoading = false;
                this.snackBar.open('Deposit successfully created', 'OK', { duration: 3000 });
            },
            (e) => {
                this.isLoading = false;
                this.snackBar.open('An error occurred while deposit create', 'OK');
                console.error(e);
            }
        );
    }

}
