import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { DomainService } from './domain.service';
import { toGenReference } from './converters';
import { Snapshot } from '../gen-damsel/domain_config';

@Injectable()
export class CheckoutCacheService {
    private cache: Snapshot;
    private isLoading = false;
    private snapshot$: Subject<Snapshot> = new Subject();

    constructor(private dmtService: DomainService) {}

    checkout(): Observable<Snapshot> {
        if (this.cache) {
            this.snapshot$.next(this.cache);
        }
        if (!this.isLoading) {
            this.isLoading = true;
            this.dmtService.checkout(toGenReference()).subscribe(s => {
                this.cache = s;
                this.isLoading = false;
                this.snapshot$.next(s);
                this.snapshot$.complete();
            });
        }
        return this.snapshot$;
    }
}
