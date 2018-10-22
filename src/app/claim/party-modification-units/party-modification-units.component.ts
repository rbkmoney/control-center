import { Component, Input } from '@angular/core';

import { PartyModificationUnit, ModificationGroupType } from '../model';

@Component({
    selector: 'cc-party-modification-units',
    templateUrl: 'party-modification-units.component.html',
    styleUrls: ['./party-modification-units.component.css']
})
export class PartyModificationUnitsComponent {

    @Input()
    unitsName: string;

    @Input()
    type: ModificationGroupType;

    @Input()
    units: PartyModificationUnit[];
}
