import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { CreateModificationDialogComponent } from '../create-modification-dialog';
import {
    ActionType,
    ContractModificationName,
    ContractorModificationName,
    ShopModificationName,
    UnitActionData,
    UnitActionType,
} from '../model';

@Component({
    templateUrl: 'unit-actions-nav-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitActionsNavListComponent implements OnInit {
    unitActionType = UnitActionType;

    contractorActions = {
        type: ActionType.ContractorAction,
        visible: false,
        names: [],
    };

    contractActions = {
        type: ActionType.ContractAction,
        visible: false,
        names: [
            ContractModificationName.legalAgreementBinding,
            ContractModificationName.reportPreferencesModification,
            ContractModificationName.adjustmentModification,
            ContractModificationName.payoutToolModification,
            ContractModificationName.termination,
        ],
    };

    shopActions = {
        type: ActionType.ShopAction,
        visible: false,
        names: [
            ShopModificationName.detailsModification,
            ShopModificationName.locationModification,
            ShopModificationName.categoryModification,
            ShopModificationName.shopAccountCreation,
            ShopModificationName.payoutScheduleModification,
            ShopModificationName.payoutToolModification,
            ShopModificationName.contractModification,
        ],
    };

    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        private dialog: MatDialog,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: UnitActionData
    ) {}

    ngOnInit() {
        switch (this.data.type) {
            case UnitActionType.AllActions:
                this.contractActions.visible = true;
                this.shopActions.visible = true;
                this.contractorActions.visible = true;
                this.contractActions.names = [
                    ContractModificationName.creation,
                    ContractModificationName.legacyCreation,
                    ...this.contractActions.names,
                ];
                this.shopActions.names = [ShopModificationName.creation, ...this.shopActions.names];
                this.contractorActions.names = [
                    ContractorModificationName.creation,
                    ...this.contractorActions.names,
                ];
                break;
            case UnitActionType.ContractActions:
                this.contractActions.visible = true;
                break;
            case UnitActionType.ShopActions:
                this.shopActions.visible = true;
                break;
            case UnitActionType.ContractorActions:
                this.contractorActions.visible = true;
        }
    }

    select(
        type: ActionType,
        name: ContractModificationName | ShopModificationName | ContractorModificationName
    ) {
        this.bottomSheetRef.dismiss();
        const config = {
            data: {
                action: {
                    type,
                    name,
                },
                partyID: this.data.partyID,
                unitID: this.data.unitID,
                fromClaim: this.data.fromClaim,
            },
            width: '900px',
            disableClose: true,
        };
        this.dialog.open<CreateModificationDialogComponent>(
            CreateModificationDialogComponent,
            config
        );
    }
}
