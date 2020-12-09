import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, of, Subject } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@cc/components/confirm-action-dialog';

import { TerminalID } from '../../../../../thrift-services/fistful/gen-model/fistful';
import { ProviderID } from '../../../../../thrift-services/fistful/gen-model/provider';
import { TerminalActionTypes } from '../../types';

@Injectable()
export class RemoveTerminalDecisionService {
    private remove$ = new Subject<{
        type: TerminalActionTypes;
        terminalID: TerminalID;
        providerID: ProviderID;
    }>();

    removed$ = this.remove$.pipe(
        tap((q) => console.log(q)),
        switchMap((data) =>
            combineLatest([
                of(data),
                this.dialog
                    .open(ConfirmActionDialogComponent, {
                        data: { title: `Remove this terminal from shop?` }
                    })
                    .afterClosed()
                    .pipe(filter((r) => r === 'confirm'))
            ])
        ),
        tap((q) => console.log(q))
    );

    constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
    }

    remove(action: { type: TerminalActionTypes; terminalID: TerminalID; providerID: ProviderID }) {
        this.remove$.next(action);
    }
}
