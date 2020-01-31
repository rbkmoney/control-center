import { PartyModification } from '../../thrift-services/damsel/gen-model/payment_processing';

export class PersistentContainer {
    modification: PartyModification;
    saved: boolean;
    typeHash?: string;
}
