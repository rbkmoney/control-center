import { Component, Inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatDialog } from '@angular/material';

import {
    ActionType,
    ContractModificationName,
    ShopModificationName,
    UnitActionData
} from '../model';
import { CreateModificationDialogComponent } from '../create-modification-dialog';

@Component({
    templateUrl: 'unit-actions-nav-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitActionsNavListComponent implements OnInit {
    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        private dialog: MatDialog,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: UnitActionData
    ) {}

    contractActions = {
        type: ActionType.contractAction,
        visible: false,
        names: [
            ContractModificationName.legalAgreementBinding,
            ContractModificationName.reportPreferencesModification,
            ContractModificationName.adjustmentModification,
            ContractModificationName.payoutToolModification,
            ContractModificationName.termination
            // ContractModificationName.contractorModification
        ]
    };

    shopActions = {
        type: ActionType.shopAction,
        visible: false,
        names: [
            ShopModificationName.detailsModification,
            ShopModificationName.locationModification,
            ShopModificationName.categoryModification,
            ShopModificationName.shopAccountCreation,
            ShopModificationName.payoutScheduleModification,
            ShopModificationName.payoutToolModification,
            ShopModificationName.contractModification
        ]
    };

    ngOnInit() {
        switch (this.data.type) {
            case 'allActions':
                this.contractActions.visible = true;
                this.shopActions.visible = true;
                this.contractActions.names = [
                    ContractModificationName.creation,
                    ...this.contractActions.names
                ];
                this.shopActions.names = [ShopModificationName.creation, ...this.shopActions.names];
                break;
            case 'contractActions':
                this.contractActions.visible = true;
                break;
            case 'shopActions':
                this.shopActions.visible = true;
        }
    }

    select(type: ActionType, name: ContractModificationName | ShopModificationName) {
        this.bottomSheetRef.dismiss();
        const config = {
            data: {
                action: {
                    type,
                    name
                },
                partyID: this.data.partyID,
                unitID: this.data.unitID
            },
            width: '800px',
            disableClose: true
        };
        this.dialog.open<CreateModificationDialogComponent>(
            CreateModificationDialogComponent,
            config
        );
    }
}
