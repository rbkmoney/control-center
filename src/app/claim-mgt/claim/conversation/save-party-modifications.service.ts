import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import isEqual from 'lodash-es/isEqual';
import { forkJoin, Observable, of, ReplaySubject, Subject } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    first,
    map,
    pluck,
    shareReplay,
    switchMap,
    tap
} from 'rxjs/operators';
import Int64 from 'thrift-ts/lib/int64';

import { ClaimManagementService } from '../../../thrift-services/damsel/claim-management.service';
import { Modification } from '../../../thrift-services/damsel/gen-model/claim_management';
import { PartyModification } from '../../../thrift-services/damsel/gen-model/payment_processing';
import { ClaimService } from '../claim.service';

@Injectable()
export class SavePartyModificationsService {
    private unsaved$: Subject<PartyModification[]> = new ReplaySubject(1);
    private save$ = new Subject();
    private saving$: Subject<boolean> = new Subject();

    unsavedModifications$: Observable<PartyModification[]> = this.unsaved$.pipe(
        distinctUntilChanged(isEqual),
        shareReplay(1)
    );
    hasUnsavedModifications$ = this.unsaved$.pipe(map((m) => m.length > 0));
    isSaving$ = this.saving$.asObservable();

    constructor(
        private route: ActivatedRoute,
        private claimManagementService: ClaimManagementService,
        private claimService: ClaimService
    ) {
        const partyId$ = this.route.params.pipe(pluck('party_id'), first());
        const claimId$ = this.route.params.pipe(
            pluck('claim_id'),
            map((claimId) => new Int64(Number(claimId))),
            first()
        );
        const claim$ = forkJoin(partyId$, claimId$).pipe(
            switchMap(([partyId, claimId]) =>
                this.claimManagementService.getClaim(partyId, claimId)
            )
        );
        this.save$
            .pipe(
                tap(() => this.saving$.next(true)),
                debounceTime(300),
                switchMap(() => this.unsavedModifications$.pipe(first())),
                map((modifications) =>
                    modifications.map((party_modification) => ({ party_modification }))
                ),
                switchMap((changeset) => forkJoin(partyId$, claimId$, of(changeset))),
                switchMap(([partyId, claimId, changeset]) =>
                    this.claimManagementService.updateClaim(
                        partyId,
                        claimId,
                        changeset as Modification[]
                    )
                ),
                switchMap(() => claim$)
            )
            .subscribe((claim) => {
                this.saving$.next(false);
                this.unsaved$.next([]);
                this.claimService.claim$.next(claim); // TODO need refactoring
            });
    }

    partyModificationsChanged(m: PartyModification[]) {
        this.unsaved$.next(m);
    }

    save() {
        this.save$.next();
    }
}
