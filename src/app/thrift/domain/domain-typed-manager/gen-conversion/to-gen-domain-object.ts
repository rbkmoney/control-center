import * as DomainTypes from '../../../gen-nodejs/domain_types';
import { DomainObject } from '../../../../damsel/domain/index';

export const toGenDomainObject = (genObject: any, field: string): DomainObject => {
    const domainObjectGen = new DomainTypes.DomainObject();
    domainObjectGen[field] = genObject;
    return domainObjectGen;
};
