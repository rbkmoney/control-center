import metadata from '../../../assets/meta-damsel.json';
import { createThriftInstanceUtils } from '../thrift-instance';
import * as base from './gen-nodejs/base_types';
import * as claim_management from './gen-nodejs/claim_management_types';
import * as domain_config from './gen-nodejs/domain_config_types';
import * as domain from './gen-nodejs/domain_types';
import * as geo_ip from './gen-nodejs/geo_ip_types';

export const namespaces = {
    base,
    domain,
    domain_config,
    claim_management,
    geo_ip,
};

export const {
    createThriftInstance: createDamselInstance,
    thriftInstanceToObject: damselInstanceToObject,
} = createThriftInstanceUtils(metadata, namespaces);
