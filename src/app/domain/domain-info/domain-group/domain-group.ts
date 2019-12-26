import { Reference } from '../../../thrift-services/damsel/gen-model/domain_config';

export interface AbstractDomainObject {
    ref: any;
    data: any;
}

export interface DomainPair {
    ref: Reference;
    object: AbstractDomainObject;
}

export interface DomainGroup {
    name: string | 'undef';
    pairs?: DomainPair[];
}
