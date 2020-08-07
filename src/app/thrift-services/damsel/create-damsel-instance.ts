import * as base from './gen-nodejs/base_types';
import * as domain_config from './gen-nodejs/domain_config_types';
import * as domain from './gen-nodejs/domain_types';
import * as claim_management from './gen-nodejs/claim_management_types';
import * as geo_ip from './gen-nodejs/geo_ip_types';
import { createNamespaceThriftInstanceCreatorByName } from '../create-thrift-instance';
import metadata from '../../../assets/meta-damsel.json';

export const namespaces = {
    base,
    domain,
    domain_config,
    claim_management,
    geo_ip,
};

export const createDamselInstance = createNamespaceThriftInstanceCreatorByName(
    metadata,
    namespaces
);
