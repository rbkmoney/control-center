import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { combineLatest, EMPTY, merge, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, switchMap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@cc/components/confirm-action-dialog';

import { DomainCacheService } from '../../../../../thrift-services/damsel/domain-cache.service';
import {
    PartyID,
    ProviderObject,
    ShopID,
} from '../../../../../thrift-services/damsel/gen-model/domain';
import { createRemoveTerminalFromShopCommit } from '../../../../../thrift-services/damsel/operations/create-remove-terminal-from-shop-commit';
import { findDomainObject } from '../../../../../thrift-services/damsel/operations/utils';
import { TerminalID } from '../../../../../thrift-services/fistful/gen-model/fistful';
import { ChangeProviderParams, TerminalActionTypes } from '../../types';

@Injectable()
export class RemoveTerminalDecisionService {
    private remove$ = new Subject<{
        type: TerminalActionTypes;
        terminalID: TerminalID;
        providerID: number;
        partyID: PartyID;
        shopID: ShopID;
    }>();

    error$ = new Subject();

    removed$ = this.remove$.pipe(
        switchMap((data) =>
            combineLatest([
                of(data),
                this.dialog
                    .open(ConfirmActionDialogComponent, {
                        data: { title: `Remove this terminal from shop?` },
                    })
                    .afterClosed()
                    .pipe(filter((r) => r === 'confirm')),
            ])
        ),
        switchMap(([data]) =>
            combineLatest([
                of(data),
                this.domainCacheService.getObjects('provider').pipe(
                    catchError((e) => {
                        this.error$.next();
                        return EMPTY;
                    }),
                ),
            ])
        ),
        map(
            ([data, providerObject]) =>
                [
                    data,
                    findDomainObject(providerObject as ProviderObject[], data.providerID),
                ] as const
        ),
        map(([data, providerObject]) => createRemoveTerminalFromShopCommit(providerObject, data)),
        switchMap((commit) =>
            this.domainCacheService.commit(commit).pipe(
                catchError((e) => {
                    this.error$.next();
                    return EMPTY;
                })
            )
        ),
        shareReplay(1)
    );

    inProgress$ = progress(this.remove$, merge(this.removed$, this.error$));

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private domainCacheService: DomainCacheService
    ) {
        this.error$.subscribe(() => {
            this.snackBar.open('An error occurred while editing providerObject');
        });
    }

    remove(params: ChangeProviderParams) {
        this.remove$.next(params);
    }
}
