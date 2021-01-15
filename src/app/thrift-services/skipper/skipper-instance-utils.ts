import metadata from '../../../assets/meta-skipper.json';
import { createThriftInstanceUtils } from '../utils/thrift-instance';
import * as base from './gen-nodejs/base_types';
import * as chargeback from './gen-nodejs/chargeback_types';
import * as skipper from './gen-nodejs/skipper_types';

const namespaces = {
    base,
    chargeback,
    skipper,
};

export const {
    createThriftInstance: createSkipperInstance,
    thriftInstanceToObject: skipperInstanceToObject,
} = createThriftInstanceUtils(metadata, namespaces);
