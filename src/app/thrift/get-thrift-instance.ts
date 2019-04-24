import * as BaseTypes from './gen-nodejs/base_types';
import * as DomainTypes from './gen-nodejs/domain_types';
import * as DomainConfigTypes from './gen-nodejs/domain_config_types';

export enum SupportedNamespaces {
    base = 'base',
    domain = 'domain',
    domain_config = 'domain_config'
}

function getClass(definition: object, name: string): any {
    const result = definition[name];
    if (!result) {
        throw new Error(`Thrift type not found: ${name}`);
    }
    return result;
}

export function getThriftInstance(namespace: string, name: string): any {
    switch (namespace) {
        case SupportedNamespaces.base:
            const BaseTypesClass = getClass(BaseTypes, name);
            return new BaseTypesClass();
        case SupportedNamespaces.domain:
            const DomainTypesClass = getClass(DomainTypes, name);
            return new DomainTypesClass();
        case SupportedNamespaces.domain:
            const DomainConfigClass = getClass(DomainConfigTypes, name);
            return new DomainConfigClass();
        default:
            throw new Error(`Unsupported thrift type. Namespace: ${namespace}, name: ${name}`);
    }
}
