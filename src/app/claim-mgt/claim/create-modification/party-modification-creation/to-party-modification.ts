import { UnitName } from './unit-name';
import { ContractModificationName } from '../../add-modification-sheet/contract-modification-name';
import { ShopModificationName } from '../../add-modification-sheet/shop-modification-name';

const toModification = (
    unitID: string,
    modification: any,
    unitName: UnitName,
    modificationName: ShopModificationName | ContractModificationName
) => ({
    [unitName]: {
        id: unitID,
        modification: {
            [modificationName]: modification
        }
    }
});

export const toPartyModification = (
    action: ShopModificationName | ContractModificationName,
    formValue: any
) => {
    const { unitID, modification } = formValue;
    const toMod = toModification.bind(null, unitID, modification);
    switch (action) {
        case ShopModificationName.creation:
        case ShopModificationName.category_modification:
        case ShopModificationName.details_modification:
        case ShopModificationName.contract_modification:
        case ShopModificationName.payout_tool_modification:
        case ShopModificationName.location_modification:
        case ShopModificationName.shop_account_creation:
        case ShopModificationName.payout_schedule_modification:
            return toMod('shop_modification', name);
        case ContractModificationName.creation:
        case ContractModificationName.legal_agreement_binding:
        case ContractModificationName.report_preferences_modification:
        case ContractModificationName.adjustment_modification:
        case ContractModificationName.payout_tool_modification:
        case ContractModificationName.contractor_modification:
        case ContractModificationName.termination:
            return toMod('contract_modification', name);
    }
};
