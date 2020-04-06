import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
    ModificationGroupType,
    ModificationUnitContainer,
    PartyModificationContainer
} from '../model';
import { PartyModificationContainerService } from './party-modification-container.service';
import { RemoveConfirmComponent } from './remove-confirm/remove-confirm.component';
import { CreateModificationDialogComponent } from '../../party-modification-creator';

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

    @Input()
    partyID: string;

    modifications: ModificationUnitContainer[];

    activeUnit: ModificationUnitContainer;

    constructor(
        private dialog: MatDialog,
        private partyModificationContainerService: PartyModificationContainerService
    ) {}

    ngOnInit() {
        this.modifications = this.container.unitContainers.slice();
        this.activeUnit = this.modifications[0];
    }

    remove() {
        const config = {
            data: {
                typeHash: this.activeUnit.typeHash
            }
        };
        this.dialog.open<RemoveConfirmComponent>(RemoveConfirmComponent, config);
    }

    edit() {
        const config = this.partyModificationContainerService.getDialogConfig(
            this.activeUnit.modificationUnit,
            this.container.name,
            this.type,
            this.partyID
        );
        this.dialog.open<CreateModificationDialogComponent>(
            CreateModificationDialogComponent,
            config
        );
    }

    onChangeTabIndex(index) {
        this.activeUnit = this.modifications[index];
    }
}
