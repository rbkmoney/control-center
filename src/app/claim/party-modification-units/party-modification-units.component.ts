import { Component, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { UnitActionsNavListComponent } from '../../party-modification-creator';
import { ClaimService } from '../claim.service';
import { ModificationGroupType, PartyModificationUnit } from '../model';

@Component({
    selector: 'cc-party-modification-units',
    templateUrl: 'party-modification-units.component.html',
    styleUrls: ['./party-modification-units.component.css'],
})
export class PartyModificationUnitsComponent {
    @Input()
    type: ModificationGroupType;

    @Input()
    units: PartyModificationUnit[];

    @Input()
    partyID: string;

    isLoading = this.claimService.isLoading;
    isAddModificationAvailable = this.claimService.isAddModificationAvailable;

    constructor(private bottomSheet: MatBottomSheet, private claimService: ClaimService) {}

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
        this.bottomSheet.open(UnitActionsNavListComponent, {
            data: { type, unitID, partyID: this.partyID },
        });
    }
}
