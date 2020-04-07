import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { toGenReference } from '../converters';
import { DomainService } from './domain.service';
import { Domain } from './gen-model/domain';

@Injectable()
export class DomainCacheService {
    private cache$: Observable<Domain>;

    constructor(private dmtService: DomainService) {}

    get domain(): Observable<Domain> {
        if (!this.cache$) {
            this.cache$ = this.dmtService.checkout(toGenReference()).pipe(
                map((s) => s.domain),
                shareReplay(1)
            );
        }
        return this.cache$;
    }

    forceReload() {
        this.cache$ = null;
    }
}
