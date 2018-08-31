import { PartyModificationUnitType } from './party-modification-unit-type';
import { PartyModificationContainer } from './party-modification-container';

export class PartyModificationUnit {
    unitID: string;
    type: PartyModificationUnitType;
    containers: PartyModificationContainer[];
}
