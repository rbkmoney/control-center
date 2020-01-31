import { UnitName } from './unit-name';
import { ShopModificationName } from '../shop-modification-name';
import { ContractModificationName } from '../contract-modification-name';
import { ActionType, ModificationAction } from '../modification-action';

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

export const toPartyModification = (action: ModificationAction, formValue: any) => {
    const { unitID, modification } = formValue;
    const toMod = toModification.bind(null, unitID, modification);
    const { type, name } = action;
    switch (type) {
        case ActionType.shopAction:
            return toMod(UnitName.shopModification, name);
        case ActionType.contractAction:
            return toMod(UnitName.contractModification, name);
    }
};
