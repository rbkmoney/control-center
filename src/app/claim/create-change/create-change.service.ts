import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import * as uuid from 'uuid/v4';

import { CreateLegalAgreementService } from './create-legal-agreement/create-legal-agreement.service';
import { CreateCategoryRefService } from './create-category-ref/create-category-ref.service';
import { ActionType, UnitAction } from '../unit-action';
import { CreateCurrencyRefService } from './create-currency-ref/create-currency-ref.service';
import { CreateContractTemplateService } from './create-contract-template/create-contract-template.service';
import { CreateBusinessScheduleRefService } from './create-business-schedule-ref/create-business-schedule-ref.service';
import { CreateServiceAcceptanceActPreferencesService } from './create-service-acceptance-act-preferences/create-service-acceptance-act-preferences.service';
import { CreateTerminalObjectService } from './create-terminal-object/create-terminal-object.service';
import { CreateTerminalParams, DomainTypedManager } from '../../domain/domain-typed-manager';
import {
    ContractModificationName,
    DomainModificationInfo,
    ShopModificationName, UnitContainerType
} from '../model';
import { CreateChangeItem } from './create-change-item';
import { ClaimService } from '../claim.service';
import { ContractModification, ShopModification } from '../../damsel';
import { CreateLocationService } from './create-location/create-location.service';
import { CreateDetailsService } from './create-details/create-details.service';
import { CreateShopService } from './create-shop/create-shop.service';
import { CreateContractService } from './create-contract/create-contract.service';

@Injectable()
export class CreateChangeService {

    domainModificationInfo$: Observable<DomainModificationInfo>;

    constructor(private createLegalAgreementService: CreateLegalAgreementService,
                private createCategoryRefService: CreateCategoryRefService,
                private createShopService: CreateShopService,
                private createContractService: CreateContractService,
                private createDetailsService: CreateDetailsService,
                private createLocationService: CreateLocationService,
                private createCurrencyRefService: CreateCurrencyRefService,
                private createContractTemplateService: CreateContractTemplateService,
                private createBusinessScheduleRefService: CreateBusinessScheduleRefService,
                private createServiceAcceptanceActPreferencesService: CreateServiceAcceptanceActPreferencesService,
                private createTerminalObjectService: CreateTerminalObjectService,
                private claimService: ClaimService,
                private domainTypedManager: DomainTypedManager) {
        this.domainModificationInfo$ = this.claimService.domainModificationInfo$;
    }

    createChange(claimAction: UnitAction, unitID: string = uuid()): Observable<void> {
        const instance = this.getCreateServiceInstance(claimAction);
        const value = instance.getValue();
        switch (claimAction.type) {
            case ActionType.shopAction:
            case ActionType.contractAction:
                const partyType = this.toPartyModificationType(claimAction.type);
                return this.claimService
                    .createChange(partyType, value as ShopModification | ContractModification, unitID);
            case ActionType.domainAction:
                return this.domainTypedManager
                    .createTerminal(value as CreateTerminalParams, unitID)
                    .pipe(map(() => {}));
        }
    }

    isFormValid(claimAction: UnitAction): boolean {
        const instance = this.getCreateServiceInstance(claimAction);
        return instance.isValid();
    }

    private getCreateServiceInstance(action: UnitAction): CreateChangeItem {
        switch (action.type) {
            case ActionType.contractAction:
                return this.getContractServiceInstance(action);
            case ActionType.shopAction:
                return this.getShopServiceInstance(action);
            case ActionType.domainAction:
                return this.createTerminalObjectService;
        }
    }

    private getContractServiceInstance(action: UnitAction): CreateChangeItem {
        switch (action.name) {
            case ContractModificationName.creation:
                return this.createContractService;
            case ContractModificationName.legalAgreementBinding:
                return this.createLegalAgreementService;
            case ContractModificationName.adjustmentModification:
                return this.createContractTemplateService;
            case ContractModificationName.reportPreferencesModification:
                return this.createServiceAcceptanceActPreferencesService;
        }
    }

    private getShopServiceInstance(action: UnitAction): CreateChangeItem {
        switch (action.name) {
            case ShopModificationName.creation:
                return this.createShopService;
            case ShopModificationName.detailsModification:
                return this.createDetailsService;
            case ShopModificationName.locationModification:
                return this.createLocationService;
            case ShopModificationName.categoryModification:
                return this.createCategoryRefService;
            case ShopModificationName.shopAccountCreation:
                return this.createCurrencyRefService;
            case ShopModificationName.payoutScheduleModification:
                return this.createBusinessScheduleRefService;
        }
    }


    private toPartyModificationType(type: ActionType): UnitContainerType {
        switch (type) {
            case ActionType.contractAction:
                return UnitContainerType.ContractUnitContainer;
            case ActionType.shopAction:
                return UnitContainerType.ShopUnitContainer;
        }
    }
}
