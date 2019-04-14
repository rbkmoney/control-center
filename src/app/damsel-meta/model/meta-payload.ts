import { MetaStruct, MetaUnion } from './index';

export interface MetaPayload {
    valid: boolean;
    payload?: MetaStruct | MetaUnion;
}
