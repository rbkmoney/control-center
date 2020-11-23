import transform from 'lodash-es/transform';

import { Domain, DomainObject, TerminalSelector } from '../gen-model/domain';

export const generateID = (objectsWithRefId: { ref: { id: number } }[]): number => {
    const ids = objectsWithRefId.map(({ ref }) => ref.id);
    return Math.max(...ids) + 1;
};

export const toMap = (domainMap: { key: any; value: any }[]): Map<string, string> => {
    const result = new Map();
    domainMap.forEach((item) => result.set(item.key, item.value));
    return result;
};

export const findDomainObject = (domainObjects: any[], id: number | string) =>
    domainObjects.find((object) => object.ref.id === id);

const transformUnion = (union: any): any =>
    transform(union, (result, value, key) => (value ? (result[key] = value) : undefined), {});

export const findDomainObjects = <F extends keyof DomainObject>(
    domain: Domain,
    fieldName: F
): DomainObject[F][] =>
    Array.from(domain).reduce((acc, [, obj]) => {
        const transformed = transformUnion(obj);
        const domainObject = transformed[fieldName];
        return domainObject ? [...acc, domainObject] : acc;
    }, []);

export const checkSelector = (selector: TerminalSelector) => {
    if (selector.value) {
        throw new Error(
            'Wrong ProviderObject terminal selector: "value". Expected ProviderObject with terminal decisions'
        );
    }
};
