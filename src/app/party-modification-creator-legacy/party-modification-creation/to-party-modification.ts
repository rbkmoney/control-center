import { ContractModificationName, ShopModificationName } from '..';
import { ActionType, ModificationAction } from '../../claim/modification-action';
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
        case ActionType.ShopAction:
            return toMod(UnitName.ShopModification, name);
        case ActionType.ContractAction:
            return toMod(UnitName.ContractModification, name);
        case ActionType.ContractorAction:
            return toMod(UnitName.ContractorModification, name);
    }
};
