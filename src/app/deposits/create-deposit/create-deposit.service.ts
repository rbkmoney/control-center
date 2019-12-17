import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import * as uuid from 'uuid/v4';

import { toMajor } from '../to-major-amount';
import { DepositParams } from '../../fistful/gen-model/fistful_admin';
import { StatDeposit } from '../../fistful/gen-model/fistful_stat';
import { poll } from '../../custom-operators/poll';
import { SearchFormParams } from '../search-form/search-form-params';
import * as moment from 'moment';
import { depositStatus } from '../deposit-status';
import { FistfulAdminService } from '../../fistful/fistful-admin.service';
import { FistfulStatisticsService } from '../../fistful/fistful-stat.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
    form = this.initForm();

    constructor(
        private fistfulAdminService: FistfulAdminService,
        private fistfulStatisticsService: FistfulStatisticsService,
        private keycloakService: KeycloakService,
        private fb: FormBuilder
    ) {}

    createDeposit(): Observable<StatDeposit> {
        const params = this.getParams();
        const pollingParams = this.getPollingSearchFormParams(params);
        return this.fistfulAdminService.createDeposit(params).pipe(
            switchMap(() =>
                this.fistfulStatisticsService.getDeposits(pollingParams).pipe(
                    map(res => res.result[0]),
                    poll<StatDeposit>(this.stopPollingCondition)
                )
            )
        );
    }

    private stopPollingCondition(deposit: StatDeposit): boolean {
        console.log(deposit);
        return !!deposit && depositStatus(deposit.status) !== 'pending';
    }

    private initForm(): FormGroup {
        return this.fb.group({
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

    private getPollingSearchFormParams(params: DepositParams): SearchFormParams {
        return {
            fromTime: moment()
                .startOf('d')
                .toISOString(),
            toTime: moment()
                .endOf('d')
                .toISOString(),
            depositId: params.id
        };
    }
}
