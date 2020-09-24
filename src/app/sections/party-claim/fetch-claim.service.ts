import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { of, ReplaySubject } from 'rxjs';
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';
import Int64 from 'thrift-ts/lib/int64';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { PartyID } from '../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class FetchClaimService {
    private getClaim$: ReplaySubject<{ partyID: PartyID; claimID: string }> = new ReplaySubject();

    claim$ = this.getClaim$.pipe(
        switchMap(({ partyID, claimID }) =>
            this.claimManagementService.getClaim(partyID, new Int64(parseInt(claimID, 10))).pipe(
                catchError((e) => {
                    console.error(e);
                    this.snackBar.open('An error occurred while fetching claim', 'OK');
                    return of('error');
                })
            )
        ),
        filter((result) => result !== 'error'),
        shareReplay(1)
    );
    isLoading$ = progress(this.getClaim$, this.claim$);

    constructor(
        private claimManagementService: ClaimManagementService,
        private snackBar: MatSnackBar
    ) {
        this.getClaim$.subscribe();
    }

    getClaim(partyID: PartyID, claimID: string) {
        this.getClaim$.next({ partyID, claimID });
    }
}
