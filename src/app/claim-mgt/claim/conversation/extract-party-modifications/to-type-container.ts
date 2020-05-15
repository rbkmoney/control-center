import { PartyModification } from '../../../../thrift-services/damsel/gen-model/claim_management';

export interface TypeContainer {
    name: string;
    modification: PartyModification;
}

export const toTypeContainer = (m: PartyModification): TypeContainer => ({
    name: 'dsa',
    modification: m,
});
