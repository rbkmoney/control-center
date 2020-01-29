import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';

import { CreateModificationComponent } from '../create-modification/create-modification.component';
import { ContractModificationName } from './contract-modification-name';
import { ShopModificationName } from './shop-modification-name';
import { ClaimID } from '../../../thrift-services/damsel/gen-model/claim_management';

interface UnitActionData {
    partyID: string;
    claimID: ClaimID;
}

@Component({
    templateUrl: 'add-modification-sheet.component.html'
})
export class AddModificationSheetComponent {
    constructor(
        private bottomSheetRef: MatBottomSheetRef,
        private dialog: MatDialog,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: UnitActionData
    ) {}

    contractActions = [
        ContractModificationName.creation,
        ContractModificationName.legal_agreement_binding,
        ContractModificationName.report_preferences_modification,
        ContractModificationName.adjustment_modification,
        ContractModificationName.payout_tool_modification,
        ContractModificationName.contractor_modification,
        ContractModificationName.termination
    ];

    shopActions = [
        ShopModificationName.creation,
        ShopModificationName.category_modification,
        ShopModificationName.details_modification,
        ShopModificationName.contract_modification,
        ShopModificationName.payout_tool_modification,
        ShopModificationName.location_modification,
        ShopModificationName.shop_account_creation,
        ShopModificationName.payout_schedule_modification
    ];

    select(name: ContractModificationName | ShopModificationName) {
        this.bottomSheetRef.dismiss();
        const config = {
            data: {
                action: name,
                partyID: this.data.partyID,
                claimID: this.data.claimID
            },
            width: '800px',
            disableClose: true
        };
        this.dialog.open<CreateModificationComponent>(CreateModificationComponent, config);
    }
}
