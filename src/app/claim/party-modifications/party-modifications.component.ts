import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ClaimService } from '../claim.service';
import { PartyModificationUnit, UnitContainerType } from '../model';
import { ModificationUnitContainerService } from '../modification-unit-container.service';

@Component({
    selector: 'cc-party-modifications',
    templateUrl: 'party-modifications.component.html'
})
export class PartyModificationsComponent implements OnInit {

    shopUnits: PartyModificationUnit[] = [];

    contractUnits: PartyModificationUnit[] = [];

    constructor(private claimService: ClaimService,
                private modificationUnitContainerService: ModificationUnitContainerService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.modificationUnitContainerService.containers$.subscribe((unitContainers) => {
            // const unitContainers = container.partyModificationUnitContainers;
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
        // this.claimService.claimInfoContainer$.subscribe((container) => {
        //     if (!container) {
        //         return;
        //     }
        //     const unitContainers = container.partyModificationUnitContainers;
        //     for (const unitContainer of unitContainers) {
        //         switch (unitContainer.type) {
        //             case UnitContainerType.ShopUnitContainer:
        //                 this.shopUnits = unitContainer.units;
        //                 break;
        //             case UnitContainerType.ContractUnitContainer:
        //                 this.contractUnits = unitContainer.units;
        //                 break;
        //             case UnitContainerType.unknown:
        //                 this.snackBar.open('Detected unknown party modification unit', 'OK');
        //                 break;
        //         }
        //     }
        // });
    }
}
