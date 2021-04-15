import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/utils';
import { merge, of, Subject } from 'rxjs';
import { catchError, filter, map, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { DomainCacheService } from '../../../../thrift-services/damsel/domain-cache.service';

@Injectable()
export class FetchProviderService {
    private getProvider$ = new Subject<number>();
    private hasError$ = new Subject();

    provider$ = this.getProvider$.pipe(
        switchMap((providerID) =>
            this.domainCacheService.getObjects('provider').pipe(
                map((providerObject) => providerObject.find((obj) => obj.ref.id === providerID)),
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

    constructor(private domainCacheService: DomainCacheService) {
        this.provider$.subscribe();
    }

    getProvider(providerID: number) {
        this.getProvider$.next(providerID);
    }
}
