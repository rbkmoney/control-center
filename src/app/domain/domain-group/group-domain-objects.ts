import { DomainObject } from '../../gen-damsel/domain';
import { DomainGroup } from './domain-group';
import { clearNullFields } from '../../shared/thrift-utils';
import { AstDefenition } from '../metadata-loader';

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

function groupByType(domainObjects: DomainObject[], domainObjDef: AstDefenition[]) {
    return domainObjects.reduce((acc, domainObj) => {
        const cleared = clearNullFields(domainObj);
        const type = getDomainObjType(cleared, domainObjDef);
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

export function group(domainObjects: DomainObject[], domainObjDef: AstDefenition[]): DomainGroup[] {
    return Object.entries(groupByType(domainObjects, domainObjDef))
        .reduce((acc, [name, objects]) => acc.concat({ name, objects }), [])
        .sort(sortByName);
}
