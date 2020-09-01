import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { toGenReference } from '../converters';
import { DomainService } from './domain.service';

@Injectable()
export class DomainCacheService {
    private reload$ = new ReplaySubject(1);

    constructor(private dmtService: DomainService) {}

    domain = this.reload$.pipe(
        startWith(undefined),
        switchMap(() => this.dmtService.checkout(toGenReference())),
        pluck('domain'),
        shareReplay(1)
    );

    forceReload() {
        this.reload$.next();
    }
}
