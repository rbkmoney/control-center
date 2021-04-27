import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { CreateModificationDialogComponent } from '../create-modification-dialog';
import {
    ActionType,
    ContractModificationName,
    ShopModificationName,
    UnitActionData,
} from '../model';
import { ContractorModificationName } from '../model/contractor-modification-name';

@Component({
    templateUrl: 'unit-actions-nav-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitActionsNavListComponent implements OnInit {
    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        private dialog: MatDialog,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: UnitActionData
    ) {}

    // eslint-disable-next-line @typescript-eslint/member-ordering
    contractorActions = {
        type: ActionType.ContractorAction,
        visible: false,
        names: [],
    };

    // eslint-disable-next-line @typescript-eslint/member-ordering
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

    // eslint-disable-next-line @typescript-eslint/member-ordering
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

    ngOnInit() {
        switch (this.data.type) {
            case 'allActions':
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
            case 'contractActions':
                this.contractActions.visible = true;
                break;
            case 'shopActions':
                this.shopActions.visible = true;
                break;
            case 'contractorActions':
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
            },
            width: '800px',
            disableClose: true,
        };
        this.dialog.open<CreateModificationDialogComponent>(
            CreateModificationDialogComponent,
            config
        );
    }
}
