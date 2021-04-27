import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Modification } from '../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../thrift-services/damsel/gen-model/domain';
import { UnitActionType } from './model';
import { UnitActionsNavListComponent } from './unit-actions-nav-list';

@Injectable()
export class PartyModificationCreatorDialogService {
    private open$ = new Subject<{
        partyID: PartyID;
        fromClaim: Modification[];
    }>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    opened$ = this.open$.pipe(
        switchMap(
            ({ partyID, fromClaim }) =>
                new Observable((observer) => {
                    this.bottomSheet.open(UnitActionsNavListComponent, {
                        data: {
                            type: UnitActionType.AllActions,
                            partyID,
                            fromClaim,
                        },
                    });
                    observer.next();
                })
        )
    );

    constructor(private bottomSheet: MatBottomSheet) {
        this.opened$.subscribe();
    }

    open(partyID: PartyID, fromClaim: Modification[]) {
        this.open$.next({ partyID, fromClaim });
    }
}
