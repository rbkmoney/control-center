import { Field } from 'thrift-ts';

import { clearNullFields } from '../../../shared/thrift-utils';
import { DomainGroup } from './domain-group';
import { Domain } from '../../../thrift-services/damsel/gen-model/domain';

function getTypeDef(domainObjDef: Field[]) {
    return domainObjDef.reduce(
        (acc, { name, type }) => ({
            ...acc,
            [name]: type
        }),
        {}
    );
}

function getDomainObjType(obj: object, domainObjDef: Field[]): string | 'undef' {
    const typeDef = getTypeDef(domainObjDef);
    const fieldName = Object.keys(obj)[0];
    const type = typeDef[fieldName];
    return type ? type : 'undef';
}

function getDomainObjVal(obj: object): object {
    return Object.values(obj)[0];
}

function groupResult(result: object, type: string | 'undef', val: object): object {
    if (type === 'undef') {
        return { undef: null };
    }
    return result[type] ? { [type]: result[type].concat(val) } : { [type]: [val] };
}

function groupByType(domain: Domain, domainObjDef: Field[]) {
    let result = {};
    for (const [ref, domainObject] of domain) {
        const cleared = clearNullFields(domainObject);
        const type = getDomainObjType(cleared, domainObjDef);
        const val = {
            ref,
            object: getDomainObjVal(cleared)
        };
        result = {
            ...result,
            ...groupResult(result, type, val)
        };
    }
    return result;
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

export function group(domain: Domain, domainObjDef: Field[]): DomainGroup[] {
    return Object.entries(groupByType(domain, domainObjDef))
        .reduce((acc, [name, pairs]) => acc.concat({ name, pairs }), [])
        .sort(sortByName);
}
