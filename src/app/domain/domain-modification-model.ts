import { Reference, DomainObject } from '../gen-damsel/domain';
import { MetaStruct, MetaUnion } from '../damsel-meta';

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
