import { Component, OnInit } from '@angular/core';

import { ClaimService } from '../claim.service';
import { PartyModificationUnit, PartyModificationUnitType } from '../model';

@Component({
    selector: 'cc-party-modifications',
    templateUrl: 'party-modifications.component.html'
})
export class PartyModificationsComponent implements OnInit {

    shopUnit: PartyModificationUnit;

    contractUnit: PartyModificationUnit;

    constructor(private claimService: ClaimService) {}

    ngOnInit() {
        this.claimService.$claimInfoContainer.subscribe((container) => {
            const units = container.partyModificationUnits;
            for (const unit of units) {
                switch (unit.type) {
                    case PartyModificationUnitType.ShopModification:
                        this.shopUnit = unit;
                        break;
                    case PartyModificationUnitType.ContractModification:
                        this.contractUnit = unit;
                        break;
                    default:
                    // TODO implement
                }
            }
        });
    }
}
