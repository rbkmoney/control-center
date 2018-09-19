import sortBy from 'lodash-es/sortBy';
import transform from 'lodash-es/transform';
import { AbstractDomainObject, AbstractStringMapItem, Domain } from '../../damsel/domain';

export const generateID = (objects: AbstractDomainObject[]): number => {
    const objWithMaxId = sortBy(objects, (obj) => obj.ref.id)[objects.length - 1];
    return objWithMaxId.ref.id + 1;
};

export const toMap = (items: AbstractStringMapItem[]): Map<string, string> => {
    const result = new Map();
    items.forEach((item) => result.set(item.key, item.value));
    return result;
};

export const findDomainObject = (objects: AbstractDomainObject[], id: number): AbstractDomainObject =>
    objects.find((object) => object.ref.id === id);

const transformUnion = (union: any): any =>
    transform(union, (result, value, key) => value ? result[key] = value : undefined, {});

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
