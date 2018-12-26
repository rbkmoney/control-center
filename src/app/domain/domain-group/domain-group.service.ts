import { Injectable } from '@angular/core';

import { DomainObject } from '../../gen-damsel/domain';
import { AstDefenition } from '../metadata-loader';
import { group } from './group-domain-objects';
import { DomainGroup } from './domain-group';

export interface DomainObjectTypeDef {
    [field: string]: string;
}

@Injectable()
export class DomainGroupService {
    private domainObjects: DomainObject[];
    private groupByField: DomainObjectTypeDef;

    setDefenition(defenitions: AstDefenition[]) {
        this.groupByField = defenitions.reduce((acc, def) => {
            return {
                ...acc,
                [def.name]: def.type
            };
        }, {});
    }

    setDomainObjects(domainObjects: DomainObject[]) {
        this.domainObjects = domainObjects;
    }

    group(): DomainGroup[] {
        if (!this.domainObjects || !this.groupByField) {
            return;
        }
        return group(this.domainObjects, this.groupByField);
    }
}
