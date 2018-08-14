import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateLegalAgreementService } from './create-legal-agreement/create-legal-agreement.service';
import { CreateCategoryRefService } from './create-category-ref/create-category-ref.service';
import { ActionType, ClaimAction } from '../claim-actions/claim-action';
import { CreateCurrencyRefService } from './create-currency-ref/create-currency-ref.service';
import { CreateContractTemplateService } from './create-contract-template/create-contract-template.service';
import { CreateBusinessScheduleRefService } from './create-business-schedule-ref/create-business-schedule-ref.service';
import { ContractModificationName, PartyModificationContainerType, ShopModificationName } from '../model';
import { CreateChangeItem } from './create-change-item';
import { ClaimService } from '../claim.service';

@Injectable()
export class CreateChangeService {

    constructor(private createLegalAgreementService: CreateLegalAgreementService,
                private createCategoryRefService: CreateCategoryRefService,
                private createCurrencyRefService: CreateCurrencyRefService,
                private createContractTemplateService: CreateContractTemplateService,
                private createBusinessScheduleRefService: CreateBusinessScheduleRefService,
                private claimService: ClaimService) {
    }

    createChange(claimAction: ClaimAction): Observable<void> {
        const instance = this.getCreateServiceInstance(claimAction);
        const modification = instance.getValue();
        const partyType = this.toPartyModificationType(claimAction.type);
        return this.claimService.createChange(partyType, modification);
    }

    isFormValid(claimAction: ClaimAction): boolean {
        const instance = this.getCreateServiceInstance(claimAction);
        return instance.isValid();
    }

    private getCreateServiceInstance(action: ClaimAction): CreateChangeItem {
        switch (action.type) {
            case ActionType.contractAction:
                return this.getContractServiceInstance(action);
            case ActionType.shopAction:
                return this.getShopServiceInstance(action);
        }
    }

    private getContractServiceInstance(action: ClaimAction): CreateChangeItem {
        switch (action.name) {
            case ContractModificationName.legalAgreementBinding:
                return this.createLegalAgreementService;
            case ContractModificationName.adjustmentModification:
                return this.createContractTemplateService;
        }
    }

    private getShopServiceInstance(action: ClaimAction): CreateChangeItem {
        switch (action.name) {
            case ShopModificationName.categoryModification:
                return this.createCategoryRefService;
            case ShopModificationName.shopAccountCreation:
                return this.createCurrencyRefService;
            case ShopModificationName.payoutScheduleModification:
                return this.createBusinessScheduleRefService;
        }
    }


    private toPartyModificationType(type: ActionType): PartyModificationContainerType {
        switch (type) {
            case ActionType.contractAction:
                return PartyModificationContainerType.ContractModification;
            case ActionType.shopAction:
                return PartyModificationContainerType.ShopModification;
        }
    }
}
