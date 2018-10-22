import { PartyModification } from '../../damsel/payment-processing';

export class PersistentContainer {
    modification: PartyModification;
    saved: boolean;
    typeHash?: string;
}
