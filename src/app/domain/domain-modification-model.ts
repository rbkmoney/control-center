import { MetaStruct, MetaUnion } from '../damsel-meta';
import { DomainObject, Reference } from '../thrift-services/damsel/gen-model/domain';

export interface ModificationItem {
    monacoContent: string;
    meta: MetaStruct | MetaUnion;
    domainObj: DomainObject;
}

export interface DomainModificationModel {
    ref: Reference;
    objectType: string;
    original: ModificationItem;
    modified: Partial<ModificationItem>;
}
