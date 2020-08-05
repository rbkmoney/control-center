import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { Subject } from 'rxjs';
import { catchError, shareReplay, startWith, switchMap } from 'rxjs/operators';
import Int64 from 'thrift-ts/lib/int64';

import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';

@Injectable()
export class PartyClaimService {
    private getClaim$ = new Subject();

    claim$ = this.getClaim$.asObservable().pipe(
        startWith({}),
        switchMap(() => this.route.params),
        switchMap(({ partyID, claimID }) =>
            this.claimManagementService.getClaim(partyID, new Int64(parseInt(claimID, 10))).pipe(
                catchError(() => {
                    this.snackBar
                        .open('An error accured while fetching claim', 'RETRY', {})
                        .onAction()
                        .subscribe(() => this.getClaim());
                    return [];
                })
            )
        ),
        shareReplay(1)
    );
    isLoading$ = progress(this.getClaim$, this.claim$);

    constructor(
        private claimManagementService: ClaimManagementService,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar
    ) {
        this.getClaim$.subscribe();
    }

    getClaim() {
        this.getClaim$.next();
    }
}
