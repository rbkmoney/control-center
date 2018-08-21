import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ClaimService } from '../claim.service';
import { PartyModificationUnit, PartyModificationUnitType } from '../model';

@Component({
    selector: 'cc-party-modifications',
    templateUrl: 'party-modifications.component.html'
})
export class PartyModificationsComponent implements OnInit {

    shopUnit: PartyModificationUnit;

    contractUnit: PartyModificationUnit;

    extractedIds: {
        shopId: string;
        contractId: string;
    };

    constructor(private claimService: ClaimService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.claimService.claimInfoContainer$.subscribe((container) => {
            if (!container) {
                return;
            }
            this.extractedIds = container.extractedIds;
            const units = container.partyModificationUnits;
            for (const unit of units) {
                switch (unit.type) {
                    case PartyModificationUnitType.ShopModification:
                        this.shopUnit = unit;
                        break;
                    case PartyModificationUnitType.ContractModification:
                        this.contractUnit = unit;
                        break;
                    case PartyModificationUnitType.unknown:
                        this.snackBar.open('Detected unknown party modification unit', 'OK');
                        break;
                }
            }
        });
    }
}
