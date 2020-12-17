import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { combineLatest, EMPTY, merge, of, Subject } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';

import { DomainCacheService } from '../domain-cache.service';
import { ProviderObject } from '../gen-model/domain';
import { editTerminalDecisionPropertyForShopCommit } from '../operations/edit-terminal-decision-property-for-shop-commit';
import { EditTerminalDecisionPropertyParams } from '../operations/edit-terminal-decision-property-params';
import { findDomainObject } from '../operations/utils';

@Injectable()
export class EditTerminalDecisionPropertyForShopService {
    private editProperty$ = new Subject<EditTerminalDecisionPropertyParams>();

    error$ = new Subject();

    edited$ = this.editProperty$.pipe(
        switchMap((params) =>
            combineLatest([
                of(params),
                this.domainCacheService.getObjects('provider').pipe(
                    catchError((e) => {
                        this.error$.next();
                        return EMPTY;
                    })
                ),
            ])
        ),
        map(
            ([params, providerObject]) =>
                [
                    params,
                    findDomainObject(providerObject as ProviderObject[], params.providerID),
                ] as const
        ),
        filter(([params, provider]) => {
            if (!provider) {
                this.error$.next();
            }
            return !!provider;
        }),
        switchMap(([params, provider]) => {
            return this.domainCacheService
                .commit(editTerminalDecisionPropertyForShopCommit(provider, params))
                .pipe(
                    catchError((e) => {
                        this.error$.next();
                        return EMPTY;
                    })
                );
        })
    );

    inProgress$ = progress(this.editProperty$, merge(this.edited$, this.error$));

    constructor(private domainCacheService: DomainCacheService, private snackBar: MatSnackBar) {
        this.error$.subscribe(() => {
            this.snackBar.open('An error occurred while editing providerObject');
        });
    }

    editTerminalDecisionPropertyForShop(params: EditTerminalDecisionPropertyParams) {
        this.editProperty$.next(params);
    }
}
