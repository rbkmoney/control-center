import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

import { Domain } from '../gen-damsel/domain';
import { DomainService } from './domain.service';
import { toGenReference } from './converters';

@Injectable()
export class DomainCacheService {
    private cache$: Observable<Domain>;

    constructor(private dmtService: DomainService) {}

    get domain(): Observable<Domain> {
        if (!this.cache$) {
            this.cache$ = this.dmtService.checkout(toGenReference()).pipe(
                map(s => s.domain),
                shareReplay(1)
            );
        }
        return this.cache$;
    }

    forceReload() {
        this.cache$ = null;
    }
}
