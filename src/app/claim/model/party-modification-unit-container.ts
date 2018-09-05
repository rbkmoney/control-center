import { PartyModificationUnit } from './party-modification-unit';
import { UnitContainerType } from './unit-container-type';

export class PartyModificationUnitContainer {
    type: UnitContainerType;
    units?: PartyModificationUnit[];
}
