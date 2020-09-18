import { Injectable } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Modification } from '../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../thrift-services/damsel/gen-model/domain';
import { UnitActionType } from './model';
import { UnitActionsNavListComponent } from './unit-actions-nav-list';

@Injectable()
export class PartyModificationCreatorDialogService {
    private open$ = new Subject<{
        type: UnitActionType;
        partyID: PartyID;
        unsaved: Modification[];
    }>();

    opened$ = this.open$.pipe(
        switchMap(
            ({ type, partyID, unsaved }) =>
                new Observable((observer) => {
                    this.bottomSheet.open(UnitActionsNavListComponent, {
                        data: {
                            type: UnitActionType.allActions,
                            partyID,
                            unsaved,
                        },
                    });
                    observer.next();
                })
        )
    );

    constructor(private bottomSheet: MatBottomSheet) {
        this.opened$.subscribe();
    }

    open(type: UnitActionType, partyID: PartyID, unsaved: Modification[]) {
        this.open$.next({ type, partyID, unsaved });
    }
}
