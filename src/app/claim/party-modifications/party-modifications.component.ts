import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ClaimService } from '../claim.service';
import { PartyModificationUnit, ModificationGroupType } from '../model';
import { PersistentContainerService } from '../persistent-container.service';
import { convert } from '../party-modification-group-converter';

@Component({
    selector: 'cc-party-modifications',
    templateUrl: 'party-modifications.component.html'
})
export class PartyModificationsComponent implements OnInit {

    shopUnits: PartyModificationUnit[] = [];

    contractUnits: PartyModificationUnit[] = [];

    constructor(private claimService: ClaimService,
                private modificationUnitContainerService: PersistentContainerService,
                private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.modificationUnitContainerService.containers$.subscribe((persistentContainers) => {
            const modificationGroups = convert(persistentContainers);
            this.shopUnits = [];
            this.contractUnits = [];
            for (const modificationGroup of modificationGroups) {
                switch (modificationGroup.type) {
                    case ModificationGroupType.ShopUnitContainer:
                        this.shopUnits = this.shopUnits.concat(modificationGroup.units);
                        break;
                    case ModificationGroupType.ContractUnitContainer:
                        this.contractUnits = this.contractUnits.concat(modificationGroup.units);
                        break;
                    case ModificationGroupType.unknown:
                        this.snackBar.open('Detected unknown party modification unit', 'OK');
                        break;
                }
            }
        });
    }
}
