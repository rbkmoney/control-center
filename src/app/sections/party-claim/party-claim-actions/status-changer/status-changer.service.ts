import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import {
    ClaimStatus,
    PartyModification,
} from '../../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { StatusChangerDialogComponent } from './status-changer-dialog.component';

@Injectable()
export class StatusChangerService {
    private destroy$: Subject<void> = new Subject();
    private changeStatus$: Subject<{
        partyID: PartyID;
        claimID: string;
        claimStatus: ClaimStatus;
    }> = new Subject();
    private changed$: Subject<PartyModification[]> = new Subject();

    statusChanged$: Observable<PartyModification[]> = this.changed$.asObservable();

    constructor(private dialog: MatDialog) {}

    init() {
        this.changeStatus$
            .pipe(
                takeUntil(this.destroy$),
                switchMap(({ partyID, claimID, claimStatus }) =>
                    this.dialog
                        .open(StatusChangerDialogComponent, {
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
            )
            .subscribe((r) => this.changed$.next(r));
    }

    changeStatus(partyID: PartyID, claimID: string, claimStatus: ClaimStatus) {
        this.changeStatus$.next({ partyID, claimID, claimStatus });
    }

    destroy() {
        this.destroy$.next();
    }
}
