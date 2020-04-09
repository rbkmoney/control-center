import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import head from 'lodash-es/head';
import isEmpty from 'lodash-es/isEmpty';
import negate from 'lodash-es/negate';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap, switchMapTo, tap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '../../../confirm-action-dialog';
import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { Claim, Modification } from '../../../thrift-services/damsel/gen-model/claim_management';
import { extractModificationsReducer, extractSeed } from './extract-modifications-reducer';

@Injectable()
export class RecreateClaimService {
    private extracted$: Subject<Modification[]> = new Subject();
    private recreate$: Subject<Claim> = new Subject();
    private error$: Subject<any> = new Subject();
    private inProcess$: Subject<boolean> = new BehaviorSubject(false);

    extractError$ = this.error$.asObservable();
    isInProcess$ = this.inProcess$.asObservable();
    extractedModifications$: Observable<Modification[]> = this.extracted$.asObservable();
    recreated$: Observable<Claim> = this.recreate$.pipe(
        switchMap((targetClaim) =>
            forkJoin([
                of(targetClaim),
                this.dialog
                    .open(ConfirmActionDialogComponent)
                    .afterClosed()
                    .pipe(filter((r) => r === 'confirm')),
            ])
        ),
        switchMap(([{ id, party_id, changeset }]) =>
            forkJoin([
                of(id),
                of(party_id),
                of(
                    changeset
                        .map((unit) => unit.modification)
                        .reduce(extractModificationsReducer, extractSeed)
                ),
            ])
        ),
        switchMap(([claimId, partyId, { recreateModifications, extractedModifications }]) => {
            const createNewClaim$ = this.claimMgtService
                .createClaim(partyId, recreateModifications)
                .pipe(
                    catchError((err) => {
                        console.error(err);
                        this.error$.next(err);
                        this.inProcess$.next(false);
                        return of(null);
                    }),
                    filter(negate(isEmpty))
                );
            const revokeCurrentClaim$ = this.claimMgtService
                .revokeClaim(partyId, claimId, `Claim recreated with ID: ${claimId}`)
                .pipe(
                    catchError((err) => {
                        console.error(err);
                        return of(true);
                    })
                );
            return of(true).pipe(
                tap(() => this.inProcess$.next(true)),
                switchMapTo(createNewClaim$),
                switchMap((recreated) => forkJoin([of(recreated), revokeCurrentClaim$])),
                map(head),
                tap(() => this.extracted$.next(extractedModifications)),
                tap(() => this.inProcess$.next(false))
            );
        }),
        shareReplay(1)
    );

    constructor(private dialog: MatDialog, private claimMgtService: ClaimManagementService) {}

    recreate(claim: Claim) {
        this.recreate$.next(claim);
    }
}
