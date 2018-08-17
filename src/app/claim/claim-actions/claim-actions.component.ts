import { Component } from '@angular/core';
import { MatBottomSheetRef, MatDialog } from '@angular/material';

import { ShopModificationName, ContractModificationName } from '../model';
import { ActionType, ClaimAction } from './claim-action';
import { CreateChangeComponent } from '../create-change/create-change.component';

@Component({
    templateUrl: 'claim-actions.component.html'
})
export class ClaimActionsComponent {

    constructor(private bottomSheetRef: MatBottomSheetRef,
                private dialog: MatDialog) {
    }

    contractActions: ClaimAction[] = [
        {
            type: ActionType.contractAction,
            name: ContractModificationName.legalAgreementBinding,
            displayName: 'LegalAgreement'
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.reportPreferencesModification,
            displayName: 'ServiceAcceptanceActPreferences'
        },
        {
            type: ActionType.contractAction,
            name: ContractModificationName.adjustmentModification,
            displayName: 'ContractAdjustment'
        },
    ];

    shopActions: ClaimAction[] = [
        {
            type: ActionType.shopAction,
            name: ShopModificationName.categoryModification,
            displayName: 'CategoryRef'
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.shopAccountCreation,
            displayName: 'CurrencyRef'
        },
        {
            type: ActionType.shopAction,
            name: ShopModificationName.payoutScheduleModification,
            displayName: 'BusinessScheduleRef'
        }
    ];

    domainActions: ClaimAction[] = [
        {
            type: ActionType.domainAction,
            displayName: 'TerminalObject',
            name: 'TerminalObject'
        }
    ];

    select(action: ClaimAction) {
        this.bottomSheetRef.dismiss();
        const config = {
            data: action,
            minWidth: '60vw',
            maxWidth: '80vw',
            disableClose: true
        };
        this.dialog.open<CreateChangeComponent, ClaimAction>(CreateChangeComponent, config);
    }
}
