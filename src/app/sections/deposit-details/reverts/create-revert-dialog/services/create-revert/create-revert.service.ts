import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMPTY, merge, ReplaySubject, Subject } from 'rxjs';
import { map, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';
import { catchError } from 'rxjs/internal/operators';
import { KeycloakService } from 'keycloak-angular';
import * as uuid from 'uuid/v4';
import Int64 from 'thrift-ts/lib/int64';
import { progress } from '@rbkmoney/utils';

import { toMinor } from '@cc/utils/to-minor';

import { PrefixedIdGeneratorService } from '@cc/app/shared/services';
import { FistfulStatisticsService } from '../../../../../../thrift-services/fistful/fistful-stat.service';
import { RevertManagementService } from '../../../../../../thrift-services/fistful/revert-management.service';
import { RevertParams } from '../../../../../../thrift-services/fistful/gen-model/deposit_revert';
import { CreateRevertDialogConfig } from '../../types/create-revert-dialog-config';

@Injectable()
export class CreateRevertService {
    private create$ = new Subject<void>();
    private errorSubject$ = new Subject<boolean>();
    private depositID$ = new ReplaySubject<string>();

    revertCreated$ = this.create$.pipe(
        map(() => this.getParams()),
        withLatestFrom(this.depositID$),
        switchMap(([params, depositID]) =>
            this.managementService.createRevert(depositID, params).pipe(
                catchError((e) => {
                    console.log(e);
                    this.errorSubject$.next(true);
                    return EMPTY;
                })
            )
        ),
        shareReplay(1)
    );

    isLoading$ = progress(this.create$, merge([this.revertCreated$, this.errorSubject$]));

    error$ = this.errorSubject$.asObservable();

    form: FormGroup;

    constructor(
        private managementService: RevertManagementService,
        private fistfulStatisticsService: FistfulStatisticsService,
        private keycloakService: KeycloakService,
        private fb: FormBuilder,
        private idGenerator: PrefixedIdGeneratorService
    ) {}

    createRevert() {
        this.create$.next();
    }

    init(params: CreateRevertDialogConfig): void {
        const { depositID, currency } = params;
        this.depositID$.next(depositID);
        this.form = this.fb.group({
            amount: ['', [Validators.required, Validators.pattern(/^\d+([\,\.]\d{1,2})?$/)]],
            currency: [currency, Validators.required],
            reason: '',
            externalID: '',
        });
    }

    private getParams(): RevertParams {
        const { reason, amount, currency, externalID } = this.form.value;
        return {
            id: this.idGenerator.usernamePrefixedUuid(),
            body: {
                amount: new Int64(toMinor(amount)),
                currency: {
                    symbolic_code: currency,
                },
            },
            reason,
            external_id: externalID,
        };
    }
}
