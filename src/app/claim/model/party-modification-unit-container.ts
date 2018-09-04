import { PartyModificationUnit } from './party-modification-unit';
import { UnitContainerType } from './party-modification-unit-container-type';

export class PartyModificationUnitContainer {
    type: UnitContainerType;
    units?: PartyModificationUnit[];
}
