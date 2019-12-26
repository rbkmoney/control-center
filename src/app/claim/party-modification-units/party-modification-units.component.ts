import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material';

import { ModificationGroupType, PartyModificationUnit } from '../model';
import { UnitActionsComponent } from '../unit-actions/unit-actions.component';
import { ClaimService } from '../claim.service';

@Component({
    selector: 'cc-party-modification-units',
    templateUrl: 'party-modification-units.component.html',
    styleUrls: ['./party-modification-units.component.css']
})
export class PartyModificationUnitsComponent {
    constructor(private claimService: ClaimService, private bottomSheet: MatBottomSheet) {}

    @Input()
    type: ModificationGroupType;

    @Input()
    units: PartyModificationUnit[];

    add(unitID: string) {
        let type: string;
        switch (this.type) {
            case ModificationGroupType.ContractUnitContainer:
                type = 'contractActions';
                break;
            case ModificationGroupType.ShopUnitContainer:
                type = 'shopActions';
                break;
            default:
                type = 'allActions';
                break;
        }
        this.bottomSheet.open(UnitActionsComponent, { data: { type, unitID } });
    }
}
