import { TerminalSelector } from '../gen-model/domain';

export const generateID = (objectsWithRefId: { ref: { id: number } }[]): number => {
    const ids = objectsWithRefId.map(({ ref }) => ref.id);
    return Math.max(...ids) + 1;
};

export const toMap = (domainMap: { key: any; value: any }[]): Map<string, string> => {
    const result = new Map();
    domainMap.forEach((item) => result.set(item.key, item.value));
    return result;
};

export const findDomainObject = <T extends { ref: { id: any } }>(
    domainObjects: T[],
    id: number | string
): T => domainObjects.find((object) => object.ref.id === id);

const transformUnion = (union: any): any =>
    transform(union, (result, value, key) => (value ? (result[key] = value) : undefined), {});

export const checkSelector = (selector: TerminalSelector) => {
    if (selector.value) {
        throw new Error(
            'Wrong ProviderObject terminal selector: "value". Expected ProviderObject with terminal decisions'
        );
    }
};
