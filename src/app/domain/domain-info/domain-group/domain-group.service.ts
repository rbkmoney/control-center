import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { group } from './group-domain-objects';
import { DomainGroup } from './domain-group';
import { DomainService } from '../../domain.service';

@Injectable()
export class DomainGroupService {
    group$: Subject<DomainGroup[]> = new BehaviorSubject(null);
    version$: Subject<number> = new BehaviorSubject(null);

    constructor(private domainService: DomainService) {
        this.domainService.payload$.subscribe(({ shapshot: { version, domain }, metadata }) => {
            this.version$.next(version.toNumber());
            this.group$.next(
                group(domain, metadata.find(({ name }) => name === 'domain').ast.union.DomainObject)
            );
        });
    }
}
