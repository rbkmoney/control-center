import { Injectable } from '@angular/core';
import { AsyncSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DomainInfoService } from '../domain-info.service';
import { DomainGroup } from './domain-group';
import { group } from './group-domain-objects';

@Injectable()
export class DomainGroupService {
    undefDetectionStatus$ = new AsyncSubject();

    constructor(private domainInfoService: DomainInfoService) {}

    initialize(): Observable<{ version: number; group: DomainGroup[] }> {
        return this.domainInfoService.payload$.pipe(
            map(({ shapshot: { version, domain }, domainDef }) => {
                const domainGroup = group(domain, domainDef);
                this.detectUndefGroup(domainGroup);
                return {
                    version: version.toNumber(),
                    group: this.filterUndef(domainGroup),
                };
            })
        );
    }

    private detectUndefGroup(domainGroup: DomainGroup[]) {
        const undef = domainGroup.find((g) => g.name === 'undef');
        if (undef) {
            this.undefDetectionStatus$.next('detected');
        }
        this.undefDetectionStatus$.complete();
    }

    private filterUndef(domainGroup: DomainGroup[]) {
        return domainGroup.filter((g) => g.name !== 'undef');
    }
}
