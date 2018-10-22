import { PartyModificationUnit } from './party-modification-unit';
import { ModificationGroupType } from './modification-group-type';

export class ModificationGroup {
    type: ModificationGroupType;
    units?: PartyModificationUnit[];
}
