import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as uuid from 'uuid/v4';

import { CreateDepositService } from './create-deposit.service';
import { DepositParams } from '../../fistful/gen-model/fistful';
import { toMajor } from '../to-major-amount';
import { KeycloakService } from 'keycloak-angular';

interface CurrencySource {
    source: string;
    currency: string;
}

const currencies: CurrencySource[] = [
    { source: '3', currency: 'RUB' },
    { source: '5', currency: 'UAH' },
    { source: 'eskin1', currency: 'USD' },
    { source: 'eskin2', currency: 'EUR' },
    { source: 'eskin3', currency: 'KZT' },
    { source: 'eskin5', currency: 'BYN' }
];

@Component({
    selector: 'cc-create-deposit',
    templateUrl: 'create-deposit.component.html'
})
export class CreateDepositComponent implements OnInit {
    form: FormGroup;

    isLoading = false;

    currencies = currencies;

    constructor(
        private createDepositService: CreateDepositService,
        private keycloakService: KeycloakService,
        private snackBar: MatSnackBar,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            source: ['3', Validators.required],
            destination: ['859', Validators.required],
            amount: ['1', Validators.required],
            currency: [currencies[0], Validators.required]
        });
    }

    createDeposit() {
        this.isLoading = true;
        const { destination, amount, currency } = this.form.value;
        const params: DepositParams = {
            id: `${this.keycloakService.getUsername()}-${uuid()}`,
            source: currency.source,
            destination,
            body: {
                amount: toMajor(amount),
                currency: {
                    symbolic_code: currency.currency
                }
            }
        };
        this.createDepositService.createDeposit(params).subscribe(
            () => {
                this.isLoading = false;
                this.snackBar.open('Deposit successfully created', 'OK', { duration: 3000 });
            },
            e => {
                this.isLoading = false;
                this.snackBar.open('An error occurred while deposit create', 'OK');
                console.error(e);
            }
        );
    }
}
