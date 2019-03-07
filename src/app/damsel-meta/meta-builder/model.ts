import { MetaTypeDefined } from '../model';

export interface MetaTypeCondition {
    type: string;
    namespace: string;
}

export interface MetaGroup {
    namespace: string;
    meta: MetaTypeDefined[];
}
