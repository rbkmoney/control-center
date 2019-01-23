import { Reference } from "../../../gen-damsel/domain_config";

export interface AbstractDomainObject {
    ref: any;
    data: any;
}

export interface DomainPair {
    ref: Reference;
    object: AbstractDomainObject;
}

export interface DomainGroup {
    name: string;
    pairs: DomainPair[];
}
