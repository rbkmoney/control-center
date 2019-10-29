import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import * as moment from 'moment';
import * as uuid from 'uuid/v4';

import { FistfulAdminService } from '../../fistful/fistful-admin.service';
import { toMajor } from '../to-major-amount';
import { DepositsService } from '../deposits.service';
import { SearchFormParams } from '../search-form/search-form-params';
import { FistfulStatisticsService } from '../../fistful/fistful-stat.service';
import { depositStatus } from '../deposit-status';
import { DepositParams } from '../../fistful/gen-model/fistful_admin';

export interface CurrencySource {
    source: string;
    currency: string;
}

export const currencies: CurrencySource[] = [
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
        private fistfulStatisticsService: FistfulStatisticsService,
        private depositsService: DepositsService,
        private keycloakService: KeycloakService,
        private fb: FormBuilder
    ) {
        this.initForm();
    }

    createDeposit(): Observable<string> {
        this.isLoading$.next(true);
        const params = this.getParams();
        return this.fistfulAdminService.createDeposit(params).pipe(
            mergeMap(() => {
                return this.fistfulStatisticsService.pollCreatedDeposit(params.id).pipe(
                    mergeMap(res => {
                        const polledDepositParams: SearchFormParams = {
                            fromTime: moment()
                                .startOf('d')
                                .toISOString(),
                            toTime: moment()
                                .endOf('d')
                                .toISOString(),
                            depositId: params.id
                        };
                        this.depositsService.search(polledDepositParams);
                        return of(
                            res.result.length > 0 ? depositStatus(res.result[0].status) : 'pending'
                        );
                    })
                );
            })
        );
    }

    getForm(): FormGroup {
        return this.form;
    }

    private initForm() {
        this.form = this.fb.group({
            destination: ['', Validators.required],
            amount: ['', [Validators.required, Validators.pattern(/^\d+([\,\.]\d{1,2})?$/)]],
            currency: [currencies[0], Validators.required]
        });
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
