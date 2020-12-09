import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { TerminalID } from '../../../../../thrift-services/fistful/gen-model/fistful';
import { ProviderID } from '../../../../../thrift-services/fistful/gen-model/provider';
import { EditTerminalDialogComponent } from '../../components/edit-terminal-dialog';
import { EditTerminalDialogResponse, TerminalActionTypes } from '../../types';

@Injectable()
export class EditTerminalDecisionService {
    private edit$ = new Subject<{
        type: TerminalActionTypes;
        terminalID: TerminalID;
        providerID: ProviderID;
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

    constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

    edit(action: { type: TerminalActionTypes; terminalID: TerminalID; providerID: ProviderID }) {
        this.edit$.next(action);
    }
}
