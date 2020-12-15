import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { PartyID, ShopID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { TerminalID } from '../../../../../thrift-services/fistful/gen-model/fistful';
import { EditTerminalDialogComponent } from '../../components/edit-terminal-dialog';
import { EditTerminalDialogResponse, TerminalActionTypes } from '../../types';

@Injectable()
export class EditTerminalDecisionService {
    private edit$ = new Subject<{
        type: TerminalActionTypes;
        terminalID: TerminalID;
        providerID: number;
        partyID: PartyID;
        shopID: ShopID;
    }>();

    terminalChanged$ = this.edit$.pipe(
        switchMap((data) =>
            this.dialog
                .open(EditTerminalDialogComponent, {
                    width: '300px',
                    disableClose: true,
                    data,
                })
                .afterClosed()
                .pipe(filter((response: EditTerminalDialogResponse) => response === 'edited'))
        )
    );

    constructor(private dialog: MatDialog) {}

    edit(action: {
        type: TerminalActionTypes;
        terminalID: TerminalID;
        providerID: number;
        partyID: PartyID;
        shopID: ShopID;
    }) {
        this.edit$.next(action);
    }
}
