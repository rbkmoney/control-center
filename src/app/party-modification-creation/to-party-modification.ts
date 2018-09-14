import { CreatableModificationName } from './creatable-modification-name';

enum UnitName {
    shopModification = 'shopModification',
    contractModification = 'contractModification'
}

enum ContractModificationName {
    creation = 'creation',
    termination = 'termination',
    adjustmentModification = 'adjustmentModification',
    payoutToolModification = 'payoutToolModification',
    legalAgreementBinding = 'legalAgreementBinding',
    reportPreferencesModification = 'reportPreferencesModification',
    contractorModification = 'contractorModification'
}

enum ShopModificationName {
    creation = 'creation',
    categoryModification = 'categoryModification',
    detailsModification = 'detailsModification',
    contractModification = 'contractModification',
    payoutToolModification = 'payoutToolModification',
    locationModification = 'locationModification',
    shopAccountCreation = 'shopAccountCreation',
    payoutScheduleModification = 'payoutScheduleModification',
    // deprecated
    proxyModification = 'proxyModification'
}

const toModification = (unitName: UnitName, modificationName: ShopModificationName | ContractModificationName, unitID: string, modification: any) => ({
    [unitName]: {
        id: unitID,
        modification: {
            [modificationName]: modification
        }
    }
});

export const toPartyModification = (name: CreatableModificationName, formValue: any) => {
    const {unitID, modification} = formValue;
    switch (name) {
        case CreatableModificationName.ContractPayoutToolModification:
            return toModification(UnitName.contractModification, ContractModificationName.payoutToolModification, unitID, modification);
        case CreatableModificationName.ContractLegalAgreementBinding:
            return toModification(UnitName.contractModification, ContractModificationName.legalAgreementBinding, unitID, modification);
        case CreatableModificationName.ContractAdjustmentModification:
            return toModification(UnitName.contractModification, ContractModificationName.adjustmentModification, unitID, modification);
        case CreatableModificationName.ContractReportPreferencesModification:
            return toModification(UnitName.contractModification, ContractModificationName.reportPreferencesModification, unitID, modification);
        case CreatableModificationName.ShopCategoryModification:
            return toModification(UnitName.shopModification, ShopModificationName.categoryModification, unitID, modification);
        case CreatableModificationName.ShopDetailsModification:
            return toModification(UnitName.shopModification, ShopModificationName.detailsModification, unitID, modification);
        case CreatableModificationName.ShopLocationModification:
            return toModification(UnitName.shopModification, ShopModificationName.locationModification, unitID, modification);
        case CreatableModificationName.ShopAccountCreation:
            return toModification(UnitName.shopModification, ShopModificationName.shopAccountCreation, unitID, modification);
        case CreatableModificationName.ShopScheduleModification:
            return toModification(UnitName.shopModification, ShopModificationName.payoutScheduleModification, unitID, modification);
        case CreatableModificationName.DomainConfigModificationAddTerminal:
            return modification.modification;
    }
};
