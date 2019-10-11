import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import * as uuid from 'uuid/v4';

import { FistfulAdminService } from '../../fistful/fistful-admin.service';
import { toMajor } from '../to-major-amount';
import { DepositParams } from '../../fistful/gen-model/fistful_admin';
import { CreateDepositComponent } from './create-deposit.component';
import { DepositsService } from '../deposits.service';
import { SearchFormParams } from '../search-form/search-form-params';
import { StatDeposit } from '../../fistful/gen-model/fistful_stat';
import { depositStatus } from '../deposit-status';

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
        private depositsService: DepositsService,
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
                const newDepositParams: SearchFormParams = {
                    fromTime: moment()
                        .startOf('day')
                        .toISOString(),
                    toTime: moment()
                        .endOf('day')
                        .toISOString(),
                    depositId: params.id
                };
                this.pollCreatedDeposit(newDepositParams).then(res => {
                    this.isLoading$.next(false);
                    const status = res.length > 0 ? depositStatus(res[0].status) : 'pending';
                    this.snackBar.open(`Deposit status is ${status}`, 'OK', { duration: 3000 });
                    dialogRef.close();
                });
            },
            () => {
                this.isLoading$.next(false);
                this.snackBar.open('An error occurred while deposit create', 'OK');
                dialogRef.close();
            }
        );
    }

    private async pollCreatedDeposit(params: SearchFormParams): Promise<StatDeposit[]> {
        let retries = 0;
        const result: StatDeposit[] = [];
        while (result.length === 0 && retries < 10) {
            await new Promise(r => setTimeout(r, 3000));
            const res = await this.depositsService.search(params).toPromise();
            if (
                res.data.deposits.length > 0 &&
                depositStatus(res.data.deposits[0].status) !== 'pending'
            ) {
                result.push(res.data.deposits[0]);
            }
            retries++;
        }
        return result;
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
