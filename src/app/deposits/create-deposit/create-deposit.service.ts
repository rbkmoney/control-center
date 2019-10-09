import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject } from 'rxjs';
import * as uuid from 'uuid/v4';

import { FistfulAdminService } from '../../fistful/fistful-admin.service';
import { toMajor } from '../to-major-amount';
import { DepositParams } from '../../fistful/gen-model/fistful_admin';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateDepositComponent } from './create-deposit.component';

export interface CurrencySource {
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

@Injectable()
export class CreateDepositService {
    form: FormGroup;

    isLoading$ = new BehaviorSubject(false);

    constructor(
        private fistfulAdminService: FistfulAdminService,
        private keycloakService: KeycloakService,
        private snackBar: MatSnackBar,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            destination: ['', Validators.required],
            amount: ['', [Validators.required, Validators.pattern(/^\d+([\,\.]\d{1,2})?$/)]],
            currency: [currencies[0], Validators.required]
        });
    }

    createDeposit(dialogRef: MatDialogRef<CreateDepositComponent>) {
        this.isLoading$.next(true);
        const params = this.getParams();
        this.fistfulAdminService.createDeposit(params).subscribe(
            () => {
                this.isLoading$.next(false);
                this.snackBar.open('Deposit successfully created', 'OK', { duration: 3000 });
            },
            e => {
                this.isLoading$.next(false);
                this.snackBar.open('An error occurred while deposit create', 'OK');
                console.error(e);
            }
        );
        dialogRef.close();
    }

    getCurrencies(): CurrencySource[] {
        return currencies;
    }

    getForm(): FormGroup {
        return this.form;
    }

    private getParams(): DepositParams {
        const { destination, amount, currency } = this.form.value;
        return {
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
    }
}
