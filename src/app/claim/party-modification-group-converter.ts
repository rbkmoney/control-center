import groupBy from 'lodash-es/groupBy';
import map from 'lodash-es/map';
import {
    ContractModificationName,
    ModificationGroup,
    ModificationGroupType,
    ModificationUnitContainer,
    PartyModificationContainer,
    PartyModificationUnit,
    PersistentContainer,
    ShopModificationName
} from './model';
import { UnitName } from '../party-modification-creation/unit-name';
import { getModificationName } from './get-modification-name';

const toContractUnitContainers = (persistentContainers: PersistentContainer[]): ModificationUnitContainer[] =>
    map(persistentContainers, (persistentContainer) => ({
        modificationUnit: persistentContainer.modification.contractModification,
        saved: persistentContainer.saved,
        typeHash: persistentContainer.typeHash
    }));

const toShopUnitContainers = (persistentContainers: PersistentContainer[]): ModificationUnitContainer[] =>
    map(persistentContainers, (persistentContainer) => ({
        modificationUnit: persistentContainer.modification.shopModification,
        saved: persistentContainer.saved,
        typeHash: persistentContainer.typeHash
    }));

const toContractContainer = (persistentContainers: PersistentContainer[]): PartyModificationContainer[] => {
    const grouped = groupBy(persistentContainers, (item: PersistentContainer) => getModificationName(item.modification));
    return map(grouped, (modifications, name: ShopModificationName | ContractModificationName) => ({
        name,
        unitContainers: toContractUnitContainers(modifications)
    }));
};

const toShopContainer = (persistentContainers: PersistentContainer[]): PartyModificationContainer[] => {
    const grouped = groupBy(persistentContainers, (item: PersistentContainer) => getModificationName(item.modification));
    return map(grouped, (modifications, name: ShopModificationName | ContractModificationName) => ({
        name,
        unitContainers: toShopUnitContainers(modifications)
    }));
};

const toContractModificationUnit = (persistentContainers: PersistentContainer[]): PartyModificationUnit[] => {
    const grouped = groupBy(persistentContainers, (item) => item.modification.contractModification.id);
    return map(grouped, (containers: PersistentContainer[], unitID) => ({
        unitID,
        saved: !isHasUnsaved(containers, unitID, UnitName.contractModification),
        containers: toContractContainer(containers)
    }));
};

const toShopModificationUnit = (persistentContainers: PersistentContainer[]): PartyModificationUnit[] => {
    const grouped = groupBy(persistentContainers, (item) => item.modification.shopModification.id);
    return map(grouped, (containers: PersistentContainer[], unitID) => ({
        unitID,
        saved: !isHasUnsaved(containers, unitID, UnitName.shopModification),
        containers: toShopContainer(containers)
    }));
};

const isHasUnsaved = (containers: PersistentContainer[], unitID: string, unitName: UnitName): boolean => {
    return containers.filter((container) =>
        !container.saved && container.modification[unitName].id === unitID).length > 0;
};

export const convert = (persistentContainers: PersistentContainer[]): ModificationGroup[] => {
    const grouped = groupBy(persistentContainers, (item: PersistentContainer) => {
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
                return {
                    type,
                    units: toShopModificationUnit(containers)
                };
            case ModificationGroupType.ContractUnitContainer:
                return {
                    type,
                    units: toContractModificationUnit(containers)
                };
            case ModificationGroupType.unknown:
                return {
                    type: ModificationGroupType.unknown
                };
        }
    });
};
