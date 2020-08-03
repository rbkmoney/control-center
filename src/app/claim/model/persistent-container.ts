import { PartyModification } from '../../thrift-services/damsel/gen-model/claim_management';

export class PersistentContainer {
    modification: PartyModification;
    saved: boolean;
    typeHash?: string;
}
