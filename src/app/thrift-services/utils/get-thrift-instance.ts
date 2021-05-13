import * as BaseTypes from '../damsel/gen-nodejs/base_types';
import * as DomainConfigTypes from '../damsel/gen-nodejs/domain_config_types';
import * as DomainTypes from '../damsel/gen-nodejs/domain_types';

export const SUPPORTED_NAMESPACES = {
    base: BaseTypes,
    domain: DomainTypes,
    domain_config: DomainConfigTypes,
};

/**
 * @deprecated use create-thrift-instance
 */
export function getThriftInstance(namespace: string, name: string): any {
    try {
        return new SUPPORTED_NAMESPACES[namespace][name]();
    } catch (e) {
        throw new Error(`Thrift type not found: ${namespace}.${name}`);
    }
}
