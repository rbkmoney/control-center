import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, merge, Observable, of, timer } from 'rxjs';
import { filter, mergeMap, switchMap, take, takeLast, takeUntil } from 'rxjs/operators';
import * as moment from 'moment';
import * as uuid from 'uuid/v4';

import { FistfulAdminService } from '../../fistful/fistful-admin.service';
import { toMajor } from '../to-major-amount';
import { DepositParams } from '../../fistful/gen-model/fistful_admin';
import { CreateDepositComponent } from './create-deposit.component';
import { DepositsService } from '../deposits.service';
import { SearchFormParams } from '../search-form/search-form-params';
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
        this.resetForm();
    }

    createDeposit(dialogRef: MatDialogRef<CreateDepositComponent>) {
        this.isLoading$.next(true);
        const params = this.getParams();
        this.fistfulAdminService
            .createDeposit(params)
            .pipe(take(1))
            .subscribe(
                () => {
                    this.pollCreatedDeposit(params.id).subscribe(res => {
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

    getCurrencies(): CurrencySource[] {
        return currencies;
    }

    getForm(): FormGroup {
        return this.form;
    }

    resetForm() {
        this.form = this.fb.group({
            destination: ['', Validators.required],
            amount: ['', [Validators.required, Validators.pattern(/^\d+([\,\.]\d{1,2})?$/)]],
            currency: [currencies[0], Validators.required]
        });
    }

    private pollCreatedDeposit(depositId: string) {
        return this.startPollingDeposit(depositId)
            .pipe(
                takeUntil(
                    merge(
                        this.depositsService.searchResult$.pipe(
                            filter(
                                res =>
                                    res[0] &&
                                    res[0].id === depositId &&
                                    depositStatus(res[0].status) !== 'pending'
                            )
                        ),
                        timer(30000)
                    )
                ),
                takeLast(1)
            )
            .pipe(
                mergeMap(() => this.depositsService.searchResult$),
                take(1)
            );
    }

    private startPollingDeposit(depositId: string, pollingInterval = 3000): Observable<void> {
        const newDepositParams: SearchFormParams = {
            fromTime: moment()
                .startOf('d')
                .toISOString(),
            toTime: moment()
                .endOf('d')
                .toISOString(),
            depositId: depositId
        };
        return timer(0, pollingInterval).pipe(
            switchMap(() => of(this.depositsService.search(newDepositParams)))
        );
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
