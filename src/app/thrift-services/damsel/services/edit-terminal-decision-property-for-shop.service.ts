import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/utils';
import { EMPTY, merge, Subject } from 'rxjs';
import { catchError, shareReplay, switchMap } from 'rxjs/operators';

import { DomainCacheService } from '../domain-cache.service';
import { editTerminalDecisionPropertyForShopCommit } from '../operations/edit-terminal-decision-property-for-shop-commit';
import { EditTerminalDecisionPropertyParams } from '../operations/edit-terminal-decision-property-params';
import { ProviderService } from '../provider.service';

@Injectable()
export class EditTerminalDecisionPropertyForShopService {
    private editProperty$ = new Subject<EditTerminalDecisionPropertyParams>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    error$ = new Subject();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    edited$ = this.editProperty$.pipe(
        switchMap((params) =>
            this.providerService.getProviderFromParams<EditTerminalDecisionPropertyParams>(params)
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

    // eslint-disable-next-line @typescript-eslint/member-ordering
    inProgress$ = progress(this.editProperty$, merge(this.edited$, this.error$));

    constructor(
        private domainCacheService: DomainCacheService,
        private snackBar: MatSnackBar,
        private providerService: ProviderService
    ) {
        this.error$.subscribe(() => {
            this.snackBar.open('An error occurred while editing providerObject');
        });
    }

    editTerminalDecisionPropertyForShop(params: EditTerminalDecisionPropertyParams) {
        this.editProperty$.next(params);
    }
}
