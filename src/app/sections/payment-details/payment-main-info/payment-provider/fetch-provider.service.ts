import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, filter, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { DomainTypedManager } from '../../../../thrift-services/damsel';
import { ProviderObject } from '../../../../thrift-services/damsel/gen-model/domain';

@Injectable()
export class FetchProviderService {
    private getProvider$ = new Subject<string>();
    private hasError$ = new Subject();

    provider$: Observable<string | ProviderObject> = this.getProvider$.pipe(
        switchMap((providerID) =>
            this.dtm.getProviderObject(providerID).pipe(
                catchError(() => {
                    this.hasError$.next();
                    return of('error');
                }),
                filter((result) => result !== 'error')
            )
        ),
        shareReplay(1)
    );

    inProgress$ = progress(this.getProvider$, merge(this.provider$, this.hasError$)).pipe(
        startWith(true)
    );

    constructor(private dtm: DomainTypedManager) {
        this.provider$.subscribe();
    }

    getProvider(providerID: string) {
        this.getProvider$.next(providerID);
    }
}
