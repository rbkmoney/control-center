import { DomainObject } from '../thrift-services/damsel/gen-model/domain';

export function clearNullFields(union: object): object {
    if (!union) {
        return;
    }
    const filtered = Object.entries(union).filter(([, v]) => v !== null);
    let result = {};
    for (const [key, val] of filtered) {
        result = {
            ...result,
            [key]: val
        };
    }
    return result;
}

export function extract(domainObject: DomainObject): object {
    if (!domainObject) {
        return;
    }
    return Object.entries(domainObject).reduce((acc, [, v]) => {
        if (v !== null) {
            return v;
        }
        return acc;
    }, null);
}
