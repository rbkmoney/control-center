import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { filter, shareReplay, switchMap } from 'rxjs/operators';

import { PartyID, ShopID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { AddTerminalDialogComponent } from '../../add-terminal-dialog/add-terminal-dialog.component';
import { AddTerminalDialogResponse } from '../../types/add-terminal-dialog-response';

@Injectable()
export class AddProviderService {
    private add$ = new Subject<{ partyID: PartyID; shopID: ShopID; categoryID: number }>();

    terminalAdded$ = this.add$.pipe(
        switchMap((data) =>
            this.dialog
                .open(AddTerminalDialogComponent, {
                    width: '760px',
                    disableClose: true,
                    data,
                })
                .afterClosed()
                .pipe(filter((response: AddTerminalDialogResponse) => response === 'added'))
        ),
        shareReplay(1)
    );

    constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {
        this.terminalAdded$.subscribe();
    }

    add(params: { partyID: PartyID; shopID: ShopID; categoryID: number }) {
        this.add$.next(params);
    }
}
