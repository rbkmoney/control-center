import groupBy from 'lodash-es/groupBy';
import map from 'lodash-es/map';
import {
    ModificationGroup,
    ModificationGroupType,
    PartyModificationUnit,
    PersistentContainer
} from './model';
import { ContractModificationUnit, ShopModificationUnit } from '../damsel/payment-processing';

interface PersistentUnit {
    modificationUnit: ShopModificationUnit | ContractModificationUnit;
    saved: boolean;
    typeHash: string;
}

enum GroupName {
    shopModification = 'shopModification',
    contractModification = 'contractModification'
}

const toContainers = (persistentUnits: PersistentUnit[]): any[] => {
    const grouped = groupBy(persistentUnits, (item) => {
        const modificationNames = Object.keys(item.modificationUnit.modification);
        if (modificationNames.length !== 1) {
            return 'unknown';
        }
        return modificationNames[0];
    });
    return map(grouped, (units, name) => ({
        name,
        unitContainers: units.map(({modificationUnit, saved, typeHash}) => ({
            modificationUnit,
            saved,
            typeHash
        }))
    }));
};

const toUnits = (persistentUnits: PersistentUnit[]): PartyModificationUnit[] => {
    const grouped = groupBy(persistentUnits, (item) => item.modificationUnit.id);
    return map(grouped, (units, unitID) => ({
        unitID,
        saved: !isHasUnsaved(units, unitID),
        containers: toContainers(units)
    }));
};

const isHasUnsaved = (units: PersistentUnit[], unitID: string): boolean =>
    units.filter((i) => !i.saved && i.modificationUnit.id === unitID).length > 0;

const toGroup = (name: GroupName, type: ModificationGroupType, containers: PersistentContainer[]): ModificationGroup => {
    const persistent = containers.map(({modification, saved, typeHash}) => ({
        modificationUnit: modification[name],
        typeHash,
        saved
    }));
    return {
        type,
        units: toUnits(persistent)
    };
};

export const convert = (containers: PersistentContainer[]): ModificationGroup[] => {
    const grouped = groupBy(containers, (item) => {
        const {shopModification, contractModification} = item.modification;
        if (shopModification) {
            return ModificationGroupType.ShopUnitContainer;
        }
        if (contractModification) {
            return ModificationGroupType.ContractUnitContainer;
        }
        return ModificationGroupType.unknown;
    });
    return map(grouped, (containers, type) => {
        switch (type) {
            case ModificationGroupType.ShopUnitContainer:
                return toGroup(GroupName.shopModification, type, containers);
            case ModificationGroupType.ContractUnitContainer:
                return toGroup(GroupName.contractModification, type, containers);
            case ModificationGroupType.unknown:
                return {type: ModificationGroupType.unknown};
        }
    });
};
