import { Injectable } from '@angular/core';
import { forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import * as moment from 'moment';
import { KeycloakService } from 'keycloak-angular';
import * as uuid from 'uuid/v4';
import Int64 from 'thrift-ts/lib/int64';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { catchError } from 'rxjs/internal/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchResult } from '@rbkmoney/partial-fetcher';

import { poll } from '@cc/utils/poll';
import { createDepositStopPollingCondition } from '@cc/app/shared/utils';
import { toMinor } from '@cc/utils/to-minor';

import { SearchParams } from '../../../types/search-params';
import { DepositParams } from '../../../../../thrift-services/fistful/gen-model/fistful_admin';
import { StatDeposit } from '../../../../../thrift-services/fistful/gen-model/fistful_stat';
import { FistfulStatisticsService } from '../../../../../thrift-services/fistful/fistful-stat.service';
import { FistfulAdminService } from '../../../../../thrift-services/fistful/fistful-admin.service';
import { currencies } from '../../../constants/currencies';

@Injectable()
export class CreateDepositService {
    private create$ = new Subject<void>();
    private errorSubject$ = new Subject<boolean>();
    private pollingErrorSubject$ = new Subject<boolean>();

    depositCreated$: Observable<StatDeposit> = this.create$.pipe(
        map(() => this.getParams()),
        switchMap((params) =>
            forkJoin([
                of(this.getPollingParams(params)),
                this.fistfulAdminService.createDeposit(params).pipe(
                    catchError(() => {
                        this.errorSubject$.next(true);
                        return of('error');
                    })
                ),
            ])
        ),
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        filter(([_, res]) => res !== 'error'),
        switchMap(([pollingParams]) =>
            this.fistfulStatisticsService.getDeposits(pollingParams).pipe(
                catchError(() => {
                    this.pollingErrorSubject$.next(true);
                    return of('error');
                }),
                filter((res) => res !== 'error'),
                map((res) => res as FetchResult<StatDeposit>),
                map((res) => res.result[0]),
                poll(createDepositStopPollingCondition)
            )
        )
    );

    isLoading$ = progress(
        this.create$,
        merge([this.depositCreated$, this.errorSubject$, this.pollingErrorSubject$])
    );

    error$ = this.errorSubject$.asObservable();
    pollingError$ = this.pollingErrorSubject$.asObservable();

    form = this.initForm();

    constructor(
        private fistfulAdminService: FistfulAdminService,
        private fistfulStatisticsService: FistfulStatisticsService,
        private keycloakService: KeycloakService,
        private fb: FormBuilder
    ) {}

    createDeposit() {
        this.create$.next();
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

    private getPollingParams(params: DepositParams): SearchParams {
        return {
            fromTime: moment().startOf('d').toISOString(),
            toTime: moment().endOf('d').toISOString(),
            depositId: params.id,
        };
    }
}
