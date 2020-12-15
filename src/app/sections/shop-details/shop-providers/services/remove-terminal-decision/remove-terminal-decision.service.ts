import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, of, Subject } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { ConfirmActionDialogComponent } from '@cc/components/confirm-action-dialog';

import { DomainCacheService } from '../../../../../thrift-services/damsel/domain-cache.service';
import { PartyID, ShopID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { createRemoveTerminalFromShopCommit } from '../../../../../thrift-services/damsel/operations/create-remove-terminal-from-shop-commit';
import { findDomainObject } from '../../../../../thrift-services/damsel/operations/utils';
import { TerminalID } from '../../../../../thrift-services/fistful/gen-model/fistful';
import { ProviderID } from '../../../../../thrift-services/fistful/gen-model/provider';
import { TerminalActionTypes } from '../../types';

@Injectable()
export class RemoveTerminalDecisionService {
    private remove$ = new Subject<{
        type: TerminalActionTypes;
        terminalID: TerminalID;
        providerID: ProviderID;
        partyID: PartyID;
        shopID: ShopID;
    }>();

    removed$ = this.remove$.pipe(
        tap((q) => console.log(q)),
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
        switchMap(([data]) => combineLatest([of(data), this.dcs.getObjects('provider')])),
        map(
            ([data, providerObject]) =>
                [data, findDomainObject(providerObject, data.providerID)] as const
        ),
        map(([data, providerObject]) => createRemoveTerminalFromShopCommit(providerObject, data)),
        switchMap((commit) => this.dcs.commit(commit)),
        shareReplay(1)
    );

    constructor(
        private dialog: MatDialog,
        private snackBar: MatSnackBar,
        private dcs: DomainCacheService
    ) {}

    remove(action: {
        type: TerminalActionTypes;
        terminalID: TerminalID;
        providerID: ProviderID;
        partyID: PartyID;
        shopID: ShopID;
    }) {
        this.remove$.next(action);
    }
}
