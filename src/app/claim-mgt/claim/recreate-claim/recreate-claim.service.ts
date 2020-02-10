import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Subject, Observable, forkJoin, of } from 'rxjs';
import { map, tap, switchMap, filter } from 'rxjs/operators';

import { Claim } from '../../../thrift-services/damsel/gen-model/claim_management';
import { PartyModification } from '../../../thrift-services/damsel/gen-model/payment_processing';
import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { ConfirmActionDialogComponent } from '../../../confirm-action-dialog';

@Injectable()
export class RecreateClaimService {
    private _extractedPartyModifications$: Subject<PartyModification[]> = new Subject();
    private recreate$: Subject<Claim> = new Subject();

    extractedPartyModifications$: Observable<
        PartyModification[]
    > = this._extractedPartyModifications$.asObservable();

    recreated$: Observable<Claim> = this.recreate$.pipe(
        switchMap(targetClaim =>
            forkJoin(
                of(targetClaim),
                this.dialog
                    .open(ConfirmActionDialogComponent)
                    .afterClosed()
                    .pipe(filter(r => r === 'confirm'))
            )
        ),
        map(([{ id, party_id, changeset }]) => {
            const { claimModifications, partyModifications } = changeset
                .map(unit => unit.modification)
                .reduce(
                    (acc, curr) => {
                        if (curr.claim_modification) {
                            acc.claimModifications = [...acc.claimModifications, curr];
                        }
                        if (curr.party_modification) {
                            acc.partyModifications = [
                                ...acc.partyModifications,
                                curr.party_modification
                            ];
                        }
                        return acc;
                    },
                    { claimModifications: [], partyModifications: [] }
                );
            return {
                clonedClaimId: id,
                partyId: party_id,
                claimModifications,
                partyModifications
            };
        }),
        switchMap(cloneContext => {
            const clonedClaim$ = this.claimManagementService.createClaim(
                cloneContext.partyId,
                cloneContext.claimModifications
            );
            return forkJoin(of(cloneContext), clonedClaim$);
        }),
        switchMap(([cloneContext, clonedClaim]) => {
            const revoked = this.claimManagementService.revokeClaim(
                cloneContext.partyId,
                cloneContext.clonedClaimId,
                `Claim recreated with ID: ${clonedClaim.id}`
            );
            return forkJoin(of(clonedClaim), of(cloneContext.partyModifications), revoked);
        }),
        tap(([, partyModifications]) =>
            this._extractedPartyModifications$.next(partyModifications)
        ),
        map(([createdClaim]) => createdClaim)
    );

    constructor(
        private dialog: MatDialog,
        private claimManagementService: ClaimManagementService
    ) {}

    recreate(claim: Claim) {
        this.recreate$.next(claim);
    }
}
