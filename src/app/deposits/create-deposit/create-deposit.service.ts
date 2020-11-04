import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import Int64 from 'thrift-ts/lib/int64';
import * as uuid from 'uuid/v4';

import { createDepositStopPollingCondition } from '@cc/app/shared/utils';
import { poll } from '@cc/utils/poll';
import { toMinor } from '@cc/utils/to-minor';

import { FistfulAdminService } from '../../thrift-services/fistful/fistful-admin.service';
import { FistfulStatisticsService } from '../../thrift-services/fistful/fistful-stat.service';
import { DepositParams } from '../../thrift-services/fistful/gen-model/fistful_admin';
import { StatDeposit } from '../../thrift-services/fistful/gen-model/fistful_stat';
import { SearchFormParams } from '../search-form/search-form-params';

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
    { source: 'eskin5', currency: 'BYN' },
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
                    map((res) => res.result[0]),
                    poll(createDepositStopPollingCondition)
                )
            )
        );
    }

    private initForm(): FormGroup {
        return this.fb.group({
            destination: ['', Validators.required],
            amount: ['', [Validators.required, Validators.pattern(/^\d+([\,\.]\d{1,2})?$/)]],
            currency: [currencies[0], Validators.required],
        });
    }

    private getParams(): DepositParams {
        const { destination, amount, currency } = this.form.value;
        return {
            id: `${this.keycloakService.getUsername()}-${uuid()}`,
            source: currency.source,
            destination,
            body: {
                amount: new Int64(toMinor(amount)),
                currency: {
                    symbolic_code: currency.currency,
                },
            },
        };
    }

    private getPollingSearchFormParams(params: DepositParams): SearchFormParams {
        return {
            fromTime: moment().startOf('d').toISOString(),
            toTime: moment().endOf('d').toISOString(),
            depositId: params.id,
        };
    }
}
