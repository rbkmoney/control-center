import { Injectable } from '@angular/core';

import {
    ClaimInfoContainer
} from './model';
import { ClaimActionType } from './claim-action-type';
import { ClaimStatus } from '../papi/model/claim-statuses';
import { MatBottomSheet } from '@angular/material';
import { UnitActionsComponent } from './unit-actions/unit-actions.component';
import { ActionType } from './modification-action';
import { ClaimService } from './claim.service';

@Injectable()
export class ModificationService {

    private claimInfoContainer: ClaimInfoContainer;

    constructor(
        private bottomSheet: MatBottomSheet,
        private claimService: ClaimService) {
            this.claimService.claimInfoContainer$.subscribe((container) => {
                this.claimInfoContainer = container;
            });
        }

    addAvailable() {
        switch (this.claimInfoContainer.type) {
            case ClaimActionType.edit:
                return this.claimInfoContainer.status === ClaimStatus.pending;
            case ClaimActionType.create:
                return true;
        }
        return false;
    }

    add(unitsName: string, unit: any) {
        console.log(unitsName);
        let actionType: string;
        if (unitsName === 'Shop modification units') {
            actionType = ActionType.shopAction;
        } 
        if (unitsName === 'Contract modification units') {
            actionType = ActionType.contractAction;
        } 
        this.bottomSheet.open(UnitActionsComponent, { data: actionType });
    }

}
