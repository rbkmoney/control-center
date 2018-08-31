import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';

import { ClaimService } from '../claim.service';
import { PartyModificationUnit, PartyModificationUnitContainerType } from '../model';
import { ClaimActionsComponent } from '../claim-actions/claim-actions.component';

@Component({
    selector: 'cc-party-modifications',
    templateUrl: 'party-modifications.component.html'
})
export class PartyModificationsComponent implements OnInit {

    shopUnits: PartyModificationUnit[] = [];

    contractUnits: PartyModificationUnit[] = [];

    claimInfoStatus: string;

    constructor(private claimService: ClaimService,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet) {
    }

    ngOnInit() {
        this.claimService.claimInfoContainer$.subscribe((container) => {
            if (!container) {
                return;
            }
            this.claimInfoStatus = container.status;
            const units = container.partyModificationUnitContainers;
            for (const unit of units) {
                switch (unit.type) {
                    case PartyModificationUnitContainerType.ShopUnitContainer:
                        this.shopUnits = unit.units;
                        break;
                    case PartyModificationUnitContainerType.ContractUnitContainer:
                        this.contractUnits = unit.units;
                        break;
                    case PartyModificationUnitContainerType.unknown:
                        this.snackBar.open('Detected unknown party modification unit', 'OK');
                        break;
                }
            }
        });
    }

    openClaimActions(unit: PartyModificationUnit) {
        this.bottomSheet.open(ClaimActionsComponent, {data: unit.unitID});
    }
}
