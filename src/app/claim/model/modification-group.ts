import { ModificationGroupType } from './modification-group-type';
import { PartyModificationUnit } from './party-modification-unit';

export class ModificationGroup {
    type: ModificationGroupType;
    units?: PartyModificationUnit[];
}
