import { AstDefenition } from '../../metadata-loader';
import { clearNullFields } from '../../../shared/thrift-utils';
import { DomainGroup } from './domain-group';
import { Domain } from '../../../gen-damsel/domain';

function getTypeDef(domainObjDef: AstDefenition[]) {
    return domainObjDef.reduce(
        (acc, { name, type }) => ({
            ...acc,
            [name]: type
        }),
        {}
    );
}

function getDomainObjType(obj: object, domainObjDef: AstDefenition[]): string {
    const typeDef = getTypeDef(domainObjDef);
    const fieldName = Object.keys(obj)[0];
    return typeDef[fieldName];
}

function getDomainObjVal(obj: object): object {
    return Object.values(obj)[0];
}

function groupByType(domain: Domain, domainObjDef: AstDefenition[]) {
    let result = {};
    for (const [ref, domainObject] of domain) {
        const cleared = clearNullFields(domainObject);
        const type = getDomainObjType(cleared, domainObjDef);
        const val = {
            ref: clearNullFields(ref),
            object: getDomainObjVal(cleared)
        };
        result = {
            ...result,
            ...(result[type] ? { [type]: result[type].concat(val) } : { [type]: [val] })
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

export function group(domain: Domain, domainObjDef: AstDefenition[]): DomainGroup[] {
    return Object.entries(groupByType(domain, domainObjDef))
        .reduce((acc, [name, pairs]) => acc.concat({ name, pairs }), [])
        .sort(sortByName);
}
