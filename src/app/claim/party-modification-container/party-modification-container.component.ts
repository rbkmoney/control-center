import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import {
    ModificationGroupType,
    ModificationUnitContainer,
    PartyModificationContainer
} from '../model';
import { ClaimService } from '../claim.service';
import { PartyModificationContainerService } from './party-modification-container.service';
import { CreateModificationComponent } from '../create-modification/create-modification.component';

@Component({
    selector: 'cc-party-modification-container',
    templateUrl: 'party-modification-container.component.html',
    styleUrls: ['./party-modification-container.component.css']
})
export class PartyModificationContainerComponent implements OnInit {
    @Input()
    container: PartyModificationContainer;

    @Input()
    type: ModificationGroupType;

    modifications: ModificationUnitContainer[];

    constructor(
        private dialog: MatDialog,
        private claimService: ClaimService,
        private partyModificationContainerService: PartyModificationContainerService
    ) {}

    ngOnInit() {
        this.modifications = this.container.unitContainers.slice();
    }

    remove(typeHash: string) {
        this.claimService.removeModification(typeHash);
    }

    edit(unit: ModificationUnitContainer) {
        const config = this.partyModificationContainerService.getDialogConfig(
            unit.modificationUnit,
            this.container.name,
            this.type
        );
        this.dialog.open<CreateModificationComponent>(CreateModificationComponent, config);
    }
}
