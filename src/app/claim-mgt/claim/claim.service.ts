import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subject, forkJoin, of } from 'rxjs';
import { pluck, first, switchMap, map } from 'rxjs/operators';
import Int64 from 'thrift-ts/lib/int64';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import {
    Claim,
    ClaimID,
    Modification
} from '../../thrift-services/damsel/gen-model/claim_management';
import { PartyModificationEmitter } from '../../party-modification-creator';

@Injectable()
export class ClaimService {
    claim$: Subject<Claim> = new Subject();

    constructor(
        private claimManagementService: ClaimManagementService,
        private partyModificationEmitter: PartyModificationEmitter,
        private snackBar: MatSnackBar,
        private route: ActivatedRoute
    ) {
        const partyId$ = this.route.params.pipe(
            pluck('party_id'),
            first()
        );
        const claimId$ = this.route.params.pipe(
            pluck('claim_id'),
            map(claimId => new Int64(Number(claimId))),
            first()
        );
        const claim$ = forkJoin(partyId$, claimId$).pipe(
            switchMap(([partyId, claimId]) =>
                this.claimManagementService.getClaim(partyId, claimId)
            )
        );
        this.partyModificationEmitter.modification$
            .pipe(
                map(party_modification => [{ party_modification } as Modification]),
                switchMap(changeset => forkJoin(partyId$, claimId$, of(changeset))),
                switchMap(([partyId, claimId, changeset]) =>
                    this.claimManagementService.updateClaim(partyId, claimId, changeset)
                ),
                switchMap(() => claim$)
            )
            .subscribe(claim => this.claim$.next(claim));
    }

    getClaim(partyID: string, claimID: ClaimID) {
        this.claimManagementService.getClaim(partyID, claimID).subscribe(
            claim => this.claim$.next(claim),
            e => {
                console.error(e);
                this.snackBar.open('Error loading the claim', 'OK');
            }
        );
    }
}
