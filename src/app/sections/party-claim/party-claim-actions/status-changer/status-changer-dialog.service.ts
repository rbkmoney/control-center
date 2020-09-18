import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { ClaimStatus } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { StatusChangerComponent } from './status-changer.component';

@Injectable()
export class StatusChangerDialogService {
    private open$ = new Subject<{ partyID: PartyID; claimID: string; claimStatus: ClaimStatus }>();

    changed$ = this.open$.pipe(
        switchMap(({ partyID, claimID, claimStatus }) =>
            this.dialog
                .open(StatusChangerComponent, {
                    width: '500px',
                    disableClose: true,
                    data: {
                        partyID,
                        claimID,
                        claimStatus,
                    },
                })
                .afterClosed()
                .pipe(filter((r) => r))
        )
    );

    constructor(private dialog: MatDialog) {
        this.changed$.subscribe();
    }

    open(partyID: PartyID, claimID: string, claimStatus: ClaimStatus) {
        this.open$.next({ partyID, claimID, claimStatus });
    }
}
