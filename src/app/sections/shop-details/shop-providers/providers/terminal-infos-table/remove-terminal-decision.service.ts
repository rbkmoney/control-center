import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { merge, of, Subject } from 'rxjs';
import { catchError, filter, shareReplay, switchMap } from 'rxjs/operators';

import { DomainTypedManager } from '../../../../../thrift-services/damsel';
import { TerminalFromShopParams } from '../../../../../thrift-services/damsel/operations/terminal-from-shop-params';

@Injectable()
export class RemoveTerminalDecisionService {
    private removeTerminal$ = new Subject<TerminalFromShopParams>();

    hasError$ = new Subject<void>();

    terminalRemoved$ = this.removeTerminal$.pipe(
        switchMap((params) =>
            this.dtm.removeTerminalFromShop(params).pipe(
                catchError(() => {
                    this.snackBar.open('An error occurred while deleting terminal decision', 'OK');
                    this.hasError$.next();
                    return of('error');
                }),
                filter((result) => result !== 'error'),
                shareReplay(1)
            )
        )
    );

    inProgress$ = progress(this.removeTerminal$, merge(this.terminalRemoved$, this.hasError$));

    constructor(private dtm: DomainTypedManager, private snackBar: MatSnackBar) {}

    removeTerminal(params: TerminalFromShopParams) {
        this.removeTerminal$.next(params);
    }
}
