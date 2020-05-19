import * as BaseTypes from './gen-nodejs/base_types';
import * as DomainConfigTypes from './gen-nodejs/domain_config_types';
import * as DomainTypes from './gen-nodejs/domain_types';

export const SupportedNamespaces = {
    base: BaseTypes,
    domain: DomainTypes,
    domain_config: DomainConfigTypes,
};

export function getThriftInstance(namespace: string, name: string): any {
    try {
        return new SupportedNamespaces[namespace][name]();
    } catch (e) {
        throw new Error(`Thrift type not found: ${namespace}.${name}`);
    }
}
