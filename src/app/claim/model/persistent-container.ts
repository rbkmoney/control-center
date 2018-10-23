import { PartyModification } from '../../gen-damsel/payment_processing';

export class PersistentContainer {
    modification: PartyModification;
    saved: boolean;
    typeHash?: string;
}
