import { PartyModificationUnit } from './party-modification-unit';
import { PartyModificationUnitContainerType } from './party-modification-unit-container-type';

export class PartyModificationUnitContainer {
    type: PartyModificationUnitContainerType;
    units: PartyModificationUnit[];
}
