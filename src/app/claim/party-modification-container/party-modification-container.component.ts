import { Component, Input, OnInit } from '@angular/core';

import { ModificationGroupType, ModificationUnitContainer, PartyModificationContainer } from '../model';
import { ClaimService } from '../claim.service';
import { CreateModificationComponent } from '../create-modification/create-modification.component';
import { MatDialog } from '@angular/material';
import { ActionType } from '../modification-action';
import { PartyModification } from '../../gen-damsel/payment_processing';

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
        private claimService: ClaimService
    ) {}

    ngOnInit() {
        this.modifications = this.container.unitContainers.slice();
    }

    remove(typeHash: string) {
        this.claimService.removeModification(typeHash);
    }

    edit(typeHash: string) {
        const modification = this.claimService.getModificationByHash(typeHash);
        const name = this.claimService.getModificationName(modification.modification);
        const type = this.getActionType();
        const config = {
            data: {
                action: {
                    type,
                    name
                },
                unitID: this.getUnitID(modification.modification, type),
                modification: modification.modification
            },
            width: '800px',
            disableClose: true
        };
        this.dialog.open<CreateModificationComponent>(CreateModificationComponent, config);
    }

    private getActionType(): ActionType {
        switch (this.type) {
            case ModificationGroupType.ContractUnitContainer:
                return ActionType.contractAction;
            case ModificationGroupType.ShopUnitContainer:
                return ActionType.shopAction;
        }
    }

    private getUnitID(modification: PartyModification, type: ActionType): string {
        switch (type) {
            case ActionType.shopAction:
                return modification.shopModification.id;
            case ActionType.contractAction:
                return modification.contractModification.id;
        }
    }
}
