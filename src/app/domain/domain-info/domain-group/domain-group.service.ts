import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { group } from './group-domain-objects';
import { DomainGroup } from './domain-group';
import { DomainInfoService } from '../domain-info.service';

@Injectable()
export class DomainGroupService {
    group$: Subject<DomainGroup[]> = new BehaviorSubject(null);
    version$: Subject<number> = new BehaviorSubject(null);

    constructor(private domainInfoService: DomainInfoService) {
        this.domainInfoService.payload$.subscribe(
            ({ shapshot: { version, domain }, domainDef }) => {
                this.version$.next(version.toNumber());
                this.group$.next(group(domain, domainDef));
            }
        );
    }
}
