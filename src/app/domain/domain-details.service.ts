import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AbstractDomainObject } from './domain-group/domain-group';

@Injectable()
export class DomainDetailsService {
    detailedObject$: Subject<AbstractDomainObject> = new Subject();

    emit(o: AbstractDomainObject) {
        this.detailedObject$.next(o);
    }
}
