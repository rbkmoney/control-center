import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { BehaviorSubject, Subject, Observable, forkJoin, of } from 'rxjs';
import { pluck, first, map, switchMap } from 'rxjs/operators';
import { Int64 } from 'thrift-ts';

import { PartyModification } from '../../thrift-services/damsel/gen-model/payment_processing';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { PartyModificationEmitter } from '../../party-modification-creator';
import { ClaimService } from './claim.service';
import { Modification } from '../../thrift-services/damsel/gen-model/claim_management';

type PartyModificationPosition = number;

@Injectable()
export class PartyModificationsPreSaver {
    private unsaved$: BehaviorSubject<PartyModification[]> = new BehaviorSubject([]);
    private save$ = new Subject();
    private remove$: Subject<PartyModificationPosition> = new Subject();

    partyModifications$: Observable<PartyModification[]> = this.unsaved$.asObservable();

    constructor(
        private route: ActivatedRoute,
        private claimManagementService: ClaimManagementService,
        private partyModificationEmitter: PartyModificationEmitter,
        private claimService: ClaimService,
        private dialog: MatDialog
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
        this.partyModificationEmitter.modification$.subscribe(modification =>
            this.unsaved$.next([...this.unsaved$.value, modification])
        );
        this.save$
            .pipe(
                switchMap(() => this.unsaved$.pipe(first())),
                map(modifications =>
                    modifications.map(party_modification => ({ party_modification }))
                ),
                switchMap(changeset => forkJoin(partyId$, claimId$, of(changeset))),
                switchMap(([partyId, claimId, changeset]) =>
                    this.claimManagementService.updateClaim(
                        partyId,
                        claimId,
                        changeset as Modification[]
                    )
                ),
                switchMap(() => claim$)
            )
            .subscribe(claim => {
                this.claimService.claim$.next(claim); // TODO need refactoring
                this.unsaved$.next([]);
            });
        this.remove$
            .pipe(
                switchMap(pos => forkJoin(of(pos), this.unsaved$.pipe(first()))),
                map(([pos, modifications]) => modifications.filter((_, i) => pos !== i))
            )
            .subscribe(modifications => this.unsaved$.next(modifications));
    }

    remove(pos: PartyModificationPosition) {
        this.remove$.next(pos);
    }

    save() {
        this.save$.next();
    }
}
