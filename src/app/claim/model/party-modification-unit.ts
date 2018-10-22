import { PartyModificationContainer } from './party-modification-container';

export class PartyModificationUnit {
    unitID: string;
    hasUnsaved: boolean;
    containers: PartyModificationContainer[];
}
