import { ActionType } from '../claim/modification-action';
import { ContractModificationName, ShopModificationName } from '../claim/model';

enum UnitName {
    shopModification = 'shopModification',
    contractModification = 'contractModification'
}

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

export const toPartyModification = (type: ActionType, name: ContractModificationName | ShopModificationName, formValue: any, unitID: string) => {
    const {modification} = formValue;
    const toShopMod = toModification.bind(null, unitID, modification, UnitName.shopModification);
    const toContractMod = toModification.bind(null, unitID, modification, UnitName.contractModification);
    switch (type) {
        case ActionType.shopAction:
            return toShopMod(name);
        case ActionType.contractAction:
            return toContractMod(name);
    }
};
