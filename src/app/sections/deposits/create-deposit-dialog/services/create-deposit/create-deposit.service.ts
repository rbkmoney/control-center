import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createDepositStopPollingCondition } from '@cc/app/shared/utils';
import { poll } from '@cc/utils/poll';
import { toMinor } from '@cc/utils/to-minor';
import { progress } from '@rbkmoney/utils';
import { KeycloakService } from 'keycloak-angular';
import * as moment from 'moment';
import { EMPTY, forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { map, switchMap } from 'rxjs/operators';
import Int64 from 'thrift-ts/lib/int64';
import * as uuid from 'uuid/v4';

import { FistfulAdminService } from '../../../../../thrift-services/fistful/fistful-admin.service';
import { FistfulStatisticsService } from '../../../../../thrift-services/fistful/fistful-stat.service';
import { DepositParams } from '../../../../../thrift-services/fistful/gen-model/fistful_admin';
import { StatDeposit } from '../../../../../thrift-services/fistful/gen-model/fistful_stat';
import { CURRENCIES } from '../../../constants/currencies';
import { SearchParams } from '../../../types/search-params';

@Injectable()
export class CreateDepositService {
    private create$ = new Subject<void>();
    private errorSubject$ = new Subject<boolean>();
    private pollingErrorSubject$ = new Subject<boolean>();
    private pollingTimeoutSubject$ = new Subject<boolean>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    depositCreated$: Observable<StatDeposit> = this.create$.pipe(
        map(() => this.getParams()),
        switchMap((params) =>
            forkJoin([
                of(this.getPollingParams(params)),
                this.fistfulAdminService.createDeposit(params).pipe(
                    catchError((e) => {
                        console.error(e);
                        this.errorSubject$.next(true);
                        return EMPTY;
                    })
                ),
            ])
        ),
        switchMap(([pollingParams]) =>
            this.fistfulStatisticsService.getDeposits(pollingParams).pipe(
                catchError((e) => {
                    console.error(e);
                    this.pollingErrorSubject$.next(true);
                    return EMPTY;
                }),
                map((res) => res.result[0]),
                poll(createDepositStopPollingCondition),
                catchError((e) => {
                    console.error(e);
                    this.pollingTimeoutSubject$.next(true);
                    return EMPTY;
                })
            )
        )
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = progress(
        this.create$,
        merge([this.depositCreated$, this.errorSubject$, this.pollingErrorSubject$])
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    error$ = this.errorSubject$.asObservable();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    pollingError$ = this.pollingErrorSubject$.asObservable();
    // eslint-disable-next-line @typescript-eslint/member-ordering
    pollingTimeout$ = this.pollingTimeoutSubject$.asObservable();

    // eslint-disable-next-line @typescript-eslint/member-ordering
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
            amount: ['', [Validators.required, Validators.pattern(/^\d+([,.]\d{1,2})?$/)]],
            currency: [CURRENCIES[0], Validators.required],
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
