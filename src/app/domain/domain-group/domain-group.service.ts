import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { group } from './group-domain-objects';
import { DomainGroup } from './domain-group';
import { Payload } from '../domain.service';

export interface DomainObjectTypeDef {
    [field: string]: string;
}

@Injectable()
export class DomainGroupService {
    group$: Subject<DomainGroup[]> = new BehaviorSubject(null);
    varsion$: Subject<number> = new BehaviorSubject(null);

    group({ shapshot: { version, domain }, metadata }: Payload) {
        this.varsion$.next(version.toNumber());
        this.group$.next(group([...domain.values()], this.getTypeDef(metadata)));
    }

    private getTypeDef(metadata: any[]): DomainObjectTypeDef {
        const domainObjectMeta = metadata.find(i => i.name === 'domain').ast.union.DomainObject;
        return domainObjectMeta.reduce((acc, def) => {
            return {
                ...acc,
                [def.name]: def.type
            };
        }, {});
    }
}
