import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { progress } from '@rbkmoney/utils';
import { EMPTY, merge, ReplaySubject, Subject } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';
import { map, shareReplay, switchMap, withLatestFrom } from 'rxjs/operators';
import Int64 from 'thrift-ts/lib/int64';

import { DepositManagementService } from '@cc/app/api/fistful';
import { UserInfoBasedIdGeneratorService } from '@cc/app/shared/services';
import { toMinor } from '@cc/utils/to-minor';

import { RevertParams } from '../../../../../../thrift-services/fistful/gen-model/deposit_revert';
import { CreateRevertDialogConfig } from '../../types/create-revert-dialog-config';

@Injectable()
export class CreateRevertService {
    private create$ = new Subject<void>();
    private errorSubject$ = new Subject<boolean>();
    private depositID$ = new ReplaySubject<string>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    revertCreated$ = this.create$.pipe(
        map(() => this.getParams()),
        withLatestFrom(this.depositID$),
        switchMap(([params, depositID]) =>
            this.depositManagementService.createRevert(depositID, params).pipe(
                catchError((e) => {
                    // eslint-disable-next-line no-console
                    console.log(e);
                    this.errorSubject$.next(true);
                    return EMPTY;
                })
            )
        ),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = progress(this.create$, merge([this.revertCreated$, this.errorSubject$]));

    // eslint-disable-next-line @typescript-eslint/member-ordering
    error$ = this.errorSubject$.asObservable();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private idGenerator: UserInfoBasedIdGeneratorService,
        private depositManagementService: DepositManagementService
    ) {}

    createRevert() {
        this.create$.next();
    }

    init(params: CreateRevertDialogConfig): void {
        const { depositID, currency } = params;
        this.depositID$.next(depositID);
        this.form = this.fb.group({
            amount: ['', [Validators.required, Validators.pattern(/^\d+([,.]\d{1,2})?$/)]],
            currency: [currency, Validators.required],
            reason: '',
            externalID: '',
        });
    }

    private getParams(): RevertParams {
        const { reason, amount, currency, externalID } = this.form.value;
        return {
            id: this.idGenerator.getUsernameBasedId(),
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
