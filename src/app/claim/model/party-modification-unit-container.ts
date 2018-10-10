import { PartyModificationUnit } from './party-modification-unit';
import { UnitContainerType } from './unit-container-type';

// ModificationGroup
export class PartyModificationUnitContainer {
    type: UnitContainerType; // ModificationGroupType
    units?: PartyModificationUnit[];
}
