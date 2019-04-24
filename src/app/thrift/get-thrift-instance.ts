import * as BaseTypes from './gen-nodejs/base_types';
import * as DomainTypes from './gen-nodejs/domain_types';
import * as DomainConfigTypes from './gen-nodejs/domain_config_types';

export const SupportedNamespaces = {
    base: BaseTypes,
    domain: DomainTypes,
    domain_config: DomainConfigTypes
};

function getClass(definition: object, name: string): any {
    const result = definition[name];
    if (!result) {
        throw new Error(`Thrift type not found: ${name}`);
    }
    return result;
}

export function getThriftInstance(namespace: string, name: string): any {
    try {
        return new SupportedNamespaces[namespace][name]();
    } catch (e) {
        throw new Error(`Thrift type not found: ${namespace}.${name}`);
    }
}
