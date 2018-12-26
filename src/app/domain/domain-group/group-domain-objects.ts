import { DomainObject } from '../../gen-damsel/domain';
import { DomainGroup } from './domain-group';
import { DomainObjectTypeDef } from './domain-group.service';
import { clearNullFields } from '../../shared/thrift-utils';

function getDomainObjType(obj: object, def: DomainObjectTypeDef): string {
    const fieldName = Object.keys(obj)[0];
    return def[fieldName];
}

function getDomainObjVal(obj: object): object {
    return Object.values(obj)[0];
}

function groupByType(domainObjects: DomainObject[], typeDef: DomainObjectTypeDef) {
    return domainObjects.reduce((acc, domainObj) => {
        const cleared = clearNullFields(domainObj);
        const type = getDomainObjType(cleared, typeDef);
        const val = getDomainObjVal(cleared);
        return {
            ...acc,
            ...(acc[type] ? { [type]: acc[type].concat(val) } : { [type]: [val] })
        };
    }, {});
}

function sortByName(a: DomainGroup, b: DomainGroup): number {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

export function group(domainObjects: DomainObject[], typeDef: DomainObjectTypeDef): DomainGroup[] {
    return Object.entries(groupByType(domainObjects, typeDef))
        .reduce((acc, [name, objects]) => acc.concat({ name, objects }), [])
        .sort(sortByName);
}
