import { ActionType, ModificationAction } from '../../claim/modification-action';
import { ContractModificationName, ShopModificationName } from '../model';
import { UnitName } from './unit-name';

const removeLegacyMark = (name: ShopModificationName | ContractModificationName): string =>
    name.replace('legacy', '').toLocaleLowerCase();

const toModification = (
    unitID: string,
    modification: any,
    unitName: UnitName,
    modificationName: ShopModificationName | ContractModificationName
) => ({
    [unitName]: {
        id: unitID,
        modification: {
            [removeLegacyMark(modificationName)]: modification,
        },
    },
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
        case ActionType.contractorAction:
            return toMod(UnitName.contractorModification, name);
    }
};
