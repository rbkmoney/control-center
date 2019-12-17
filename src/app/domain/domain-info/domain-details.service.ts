import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { DomainPair } from './domain-group';

@Injectable()
export class DomainDetailsService {
    domainPair$: Subject<DomainPair> = new Subject();

    emit(p: DomainPair) {
        this.domainPair$.next(p);
    }
}
