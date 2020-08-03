import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { Subject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import Int64 from 'thrift-ts/lib/int64';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';

@Injectable()
export class PartyClaimService {
    private getClaim$ = new Subject();

    claim$ = this.getClaim$.pipe(
        switchMap(() => this.route.params),
        switchMap(({ partyID, claimID }) =>
            this.claimManagementService.getClaim(partyID, new Int64(parseInt(claimID, 10)))
        ),
        shareReplay(1)
    );
    isLoading$ = progress(this.getClaim$, this.claim$);

    constructor(
        private claimManagementService: ClaimManagementService,
        private route: ActivatedRoute
    ) {
        this.getClaim$.subscribe();
        this.claim$.subscribe();
    }

    getClaim() {
        this.getClaim$.next();
    }
}
