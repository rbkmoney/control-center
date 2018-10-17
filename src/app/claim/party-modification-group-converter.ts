import groupBy from 'lodash-es/groupBy';
import map from 'lodash-es/map';

import { ContractModification, PartyModification, ShopModification } from '../damsel';
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

export const toContractModificationName = (modification: ContractModification): ContractModificationName => {
    const {
        creation,
        termination,
        adjustmentModification,
        payoutToolModification,
        legalAgreementBinding,
        reportPreferencesModification
    } = modification;
    if (creation) {
        return ContractModificationName.creation;
    }
    if (termination) {
        return ContractModificationName.termination;
    }
    if (adjustmentModification) {
        return ContractModificationName.adjustmentModification;
    }
    if (payoutToolModification) {
        return ContractModificationName.payoutToolModification;
    }
    if (legalAgreementBinding) {
        return ContractModificationName.legalAgreementBinding;
    }
    if (reportPreferencesModification) {
        return ContractModificationName.reportPreferencesModification;
    }
    return ContractModificationName.unknown;
};

export const toShopModificationName = (modification: ShopModification): ShopModificationName => {
    const {
        creation,
        categoryModification,
        detailsModification,
        contractModification,
        payoutToolModification,
        locationModification,
        shopAccountCreation,
        payoutScheduleModification
    } = modification;
    if (creation) {
        return ShopModificationName.creation;
    }
    if (categoryModification) {
        return ShopModificationName.categoryModification;
    }
    if (detailsModification) {
        return ShopModificationName.detailsModification;
    }
    if (contractModification) {
        return ShopModificationName.contractModification;
    }
    if (payoutToolModification) {
        return ShopModificationName.payoutToolModification;
    }
    if (locationModification) {
        return ShopModificationName.locationModification;
    }
    if (shopAccountCreation) {
        return ShopModificationName.shopAccountCreation;
    }
    if (payoutScheduleModification) {
        return ShopModificationName.payoutScheduleModification;
    }
    return ShopModificationName.unknown;
};

const toUnitContainers = (persistentContainers: PersistentContainer[]): ModificationUnitContainer[] =>
    map(persistentContainers, (persistentContainer) => ({
        modificationUnit: persistentContainer.modification[getmodificationType(persistentContainer.modification)],
        saved: persistentContainer.saved,
        typeHash: persistentContainer.typeHash
    }));

const toContainer = (persistentContainers: PersistentContainer[]): PartyModificationContainer[] => {
    const grouped = groupBy(persistentContainers, (item: PersistentContainer) =>
        toShopModificationName(item.modification[getmodificationType(item.modification) as string].modification));
    return map(grouped, (modifications, name: ShopModificationName | ContractModificationName) => ({
        name,
        unitContainers: toUnitContainers(modifications)
    }));
};

const toModificationUnit = (persistentContainers: PersistentContainer[]): PartyModificationUnit[] => {
    const grouped = groupBy(persistentContainers, (item) => item.modification[getmodificationType(item.modification)].id);
    return map(grouped, (containers: PersistentContainer[], unitID) => ({
        unitID,
        saved: !isHasUnsaved(containers, unitID),
        containers: toContainer(containers)
    }));
};

const isHasUnsaved = (containers: PersistentContainer[], unitID: string): boolean => {
    return containers.filter((container) =>
        !container.saved && container.modification[getmodificationType(container.modification)].id === unitID).length > 0;
};

export const getmodificationType = (modification: PartyModification): UnitName => {
    const {contractModification, shopModification} = modification;
    if (contractModification) {
        return UnitName.contractModification;
    }
    if (shopModification) {
        return UnitName.shopModification;
    }
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
            case ModificationGroupType.ContractUnitContainer:
                return {
                    type,
                    units: toModificationUnit(containers)
                };
            case ModificationGroupType.unknown:
                return {
                    type: ModificationGroupType.unknown
                };
        }
    });
};
