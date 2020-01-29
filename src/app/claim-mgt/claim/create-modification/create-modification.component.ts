import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import {
    ClaimID,
    PartyModification
} from '../../../thrift-services/damsel/gen-model/claim_management';
import { ShopModificationName } from '../add-modification-sheet/shop-modification-name';
import { ContractModificationName } from '../add-modification-sheet/contract-modification-name';
import { CreateModificationService } from './create-modification.service';

export interface CreateModificationData {
    action: ContractModificationName | ShopModificationName;
    partyID: string;
    claimID: ClaimID;
}

@Component({
    templateUrl: 'create-modification.component.html',
    providers: [CreateModificationService]
})
export class CreateModificationComponent {
    contractModificationName = ContractModificationName;
    shopModificationName = ShopModificationName;

    constructor(
        private dialogRef: MatDialogRef<CreateModificationComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CreateModificationData
    ) {}

    cons($event: PartyModification) {
        console.log($event);
    }
}
