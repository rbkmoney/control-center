import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { EMPTY, merge, Subject } from 'rxjs';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';

import { DomainCacheService } from '../domain-cache.service';
import { DomainTypedManager } from '../domain-typed-manager';
import { editTerminalDecisionPropertyForShopCommit } from '../operations/edit-terminal-decision-property-for-shop-commit';
import { EditTerminalDecisionPropertyParams } from '../operations/edit-terminal-decision-property-params';

@Injectable()
export class EditTerminalDecisionPropertyForShopService {
    private editProperty$ = new Subject<EditTerminalDecisionPropertyParams>();

    error$ = new Subject();

    edited$ = this.editProperty$.pipe(
        switchMap((params) =>
            this.domainTypedManager.getProviderFromParams<EditTerminalDecisionPropertyParams>(
                params
            )
        ),
        switchMap(([params, provider]) =>
            this.domainCacheService
                .commit(editTerminalDecisionPropertyForShopCommit(provider, params))
                .pipe(
                    catchError(() => {
                        this.error$.next();
                        return EMPTY;
                    })
                )
        ),
        shareReplay(1)
    );

    inProgress$ = progress(this.editProperty$, merge(this.edited$, this.error$));

    constructor(
        private domainCacheService: DomainCacheService,
        private snackBar: MatSnackBar,
        private domainTypedManager: DomainTypedManager
    ) {
        this.error$.subscribe(() => {
            this.snackBar.open('An error occurred while editing providerObject');
        });
    }

    editTerminalDecisionPropertyForShop(params: EditTerminalDecisionPropertyParams) {
        this.editProperty$.next(params);
    }
}
