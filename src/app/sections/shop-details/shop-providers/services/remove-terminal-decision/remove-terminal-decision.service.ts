import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { combineLatest, EMPTY, merge, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@cc/components/confirm-action-dialog';

import { ProviderService } from '../../../../../thrift-services/damsel';
import { DomainCacheService } from '../../../../../thrift-services/damsel/domain-cache.service';
import { createRemoveTerminalFromShopCommit } from '../../../../../thrift-services/damsel/operations/create-remove-terminal-from-shop-commit';
import { RemoveTerminalFromShopParams } from '../../../../../thrift-services/damsel/operations/remove-terminal-from-shop-params';
import { ChangeProviderParams } from '../../types';

@Injectable()
export class RemoveTerminalDecisionService {
    private remove$ = new Subject<ChangeProviderParams>();

    error$ = new Subject();
    cancelled$ = new Subject();

    terminalRemoved$ = this.remove$.pipe(
        switchMap((params) =>
            combineLatest([
                of(params),
                this.dialog
                    .open(ConfirmActionDialogComponent, {
                        data: { title: `Remove this terminal from shop?` },
                    })
                    .afterClosed()
                    .pipe(
                        filter((r) => {
                            if (r === 'cancel') {
                                this.cancelled$.next();
                            }
                            return r === 'confirm';
                        })
                    ),
            ])
        ),
        switchMap(([params]) =>
            this.providerService.getProviderFromParams<RemoveTerminalFromShopParams>(params)
        ),
        map(([params, providerObject]) =>
            createRemoveTerminalFromShopCommit(providerObject, params)
        ),
        switchMap((commit) =>
            this.domainCacheService.commit(commit).pipe(
                catchError(() => {
                    this.error$.next();
                    return EMPTY;
                })
            )
        ),
        shareReplay(1)
    );

    inProgress$ = progress(
        this.remove$,
        merge(this.terminalRemoved$, this.error$, this.cancelled$)
    );

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private domainCacheService: DomainCacheService,
        private providerService: ProviderService
    ) {
        this.terminalRemoved$.subscribe();
        this.error$.subscribe(() => {
            this.snackBar.open('An error occurred while editing providerObject', 'OK');
        });
    }

    remove(params: ChangeProviderParams) {
        this.remove$.next(params);
    }
}
