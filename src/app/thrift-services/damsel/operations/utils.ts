import sortBy from 'lodash-es/sortBy';
import transform from 'lodash-es/transform';

import { Domain, TerminalSelector } from '../gen-model/domain';

export const generateID = (domainObjects: any[]): number => {
    const objWithMaxId = sortBy(domainObjects, (obj) => obj.ref.id)[domainObjects.length - 1];
    return objWithMaxId.ref.id + 1;
};

export const toMap = (domainMap: { key: any; value: any }[]): Map<string, string> => {
    const result = new Map();
    domainMap.forEach((item) => result.set(item.key, item.value));
    return result;
};

export const findDomainObject = (domainObjects: any[], id: number) =>
    domainObjects.find((object) => object.ref.id === id);

const transformUnion = (union: any): any =>
    transform(union, (result, value, key) => (value ? (result[key] = value) : undefined), {});

export const findDomainObjects = (domain: Domain, fieldName: string): any[] => {
    const result = [];
    domain.forEach((obj) => {
        const transformed = transformUnion(obj);
        const domainObject = transformed[fieldName];
        if (domainObject) {
            result.push(domainObject);
        }
    });
    return result;
};

export const checkSelector = (selector: TerminalSelector) => {
    if (selector.value) {
        throw new Error(
            'Wrong ProviderObject terminal selector: "value". Expected ProviderObject with terminal decisions'
        );
    }
};
