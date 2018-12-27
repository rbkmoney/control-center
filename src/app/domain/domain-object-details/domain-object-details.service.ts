import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AbstractDomainObject } from '../domain-group/domain-group';

@Injectable()
export class DomainObjectDetailsService {
    target$: Subject<AbstractDomainObject> = new Subject();
    containerOpenedChange$: Subject<boolean> = new Subject();

    open(obj: AbstractDomainObject) {
        this.containerOpenedChange$.next(true);
        this.target$.next(obj);
    }

    close() {
        this.containerOpenedChange$.next(false);
    }
}
