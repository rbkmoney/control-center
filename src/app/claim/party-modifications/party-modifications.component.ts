import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatSnackBar } from '@angular/material';

import { ClaimService } from '../claim.service';
import { PartyModificationUnit, PartyModificationUnitContainerType } from '../model';
import { UnitActionsComponent } from '../unit-actions/unit-actions.component';

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

    openUnitActions(unit: PartyModificationUnit) {
        this.bottomSheet.open(UnitActionsComponent, {data: {unitID: unit.unitID, type: unit.type}});
    }
}
