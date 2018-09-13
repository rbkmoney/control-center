import { Reference, Version } from '../../../damsel/index';
import * as DomainConfigTypes from '../../gen-nodejs/domain_config_types';

const toGenHead = () => {
    const reference = new DomainConfigTypes.Reference();
    reference.head = new DomainConfigTypes.Head();
    return reference;
};

const toGenVersion = (version: Version) => {
    const reference = new DomainConfigTypes.Reference();
    reference.version = version;
    return reference;
};

export const toGenReference = (reference: Reference = {head: {}}): any => {
    let result;
    if (reference.head) {
        result = toGenHead();
    } else if (reference.version) {
        result = toGenVersion(reference.version);
    }
    return result;
};
