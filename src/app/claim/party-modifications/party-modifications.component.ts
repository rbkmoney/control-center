import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ClaimService } from '../claim.service';
import { PartyModificationUnit, UnitContainerType } from '../model';

@Component({
    selector: 'cc-party-modifications',
    templateUrl: 'party-modifications.component.html'
})
export class PartyModificationsComponent implements OnInit {

    shopUnits: PartyModificationUnit[] = [];

    contractUnits: PartyModificationUnit[] = [];

    claimInfoStatus: string;

    constructor(private claimService: ClaimService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.claimService.claimInfoContainer$.subscribe((container) => {
            if (!container) {
                return;
            }
            this.claimInfoStatus = container.status;
            const unitContainers = container.partyModificationUnitContainers;
            for (const unitContainer of unitContainers) {
                switch (unitContainer.type) {
                    case UnitContainerType.ShopUnitContainer:
                        this.shopUnits = unitContainer.units;
                        break;
                    case UnitContainerType.ContractUnitContainer:
                        this.contractUnits = unitContainer.units;
                        break;
                    case UnitContainerType.unknown:
                        this.snackBar.open('Detected unknown party modification unit', 'OK');
                        break;
                }
            }
        });
    }
}
