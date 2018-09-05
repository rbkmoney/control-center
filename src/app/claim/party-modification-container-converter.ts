import groupBy from 'lodash-es/groupBy';
import map from 'lodash-es/map';

import { ContractModificationUnit, PartyModification, ShopModificationUnit } from '../damsel';
import {
    ContractModificationName,
    PartyModificationContainer,
    PartyModificationUnit,
    PartyModificationUnitContainer,
    ShopModificationName,
    UnitContainerType
} from './model';

const toContractContainers = (modification: ContractModificationUnit[]): PartyModificationContainer[] => {
    const grouped = groupBy(modification, (item: ContractModificationUnit) => {
        const {
            creation,
            termination,
            adjustmentModification,
            payoutToolModification,
            legalAgreementBinding,
            reportPreferencesModification
        } = item.modification;
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
    });
    return map(grouped, (modifications, name: ContractModificationName) => ({
        name,
        modifications
    }));
};

const toShopContainer = (modification: ShopModificationUnit[]): PartyModificationContainer[] => {
    const grouped = groupBy(modification, (item: ShopModificationUnit) => {
        const {
            creation,
            categoryModification,
            detailsModification,
            contractModification,
            payoutToolModification,
            locationModification,
            shopAccountCreation,
            payoutScheduleModification
        } = item.modification;
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
    });
    return map(grouped, (modifications, name: ShopModificationName) => ({
        name,
        modifications
    }));
};

const toShopPartyModificationUnit = (shopUnits: PartyModification[]): PartyModificationUnit[] => {
    const grouped = groupBy(shopUnits, (item) => item.shopModification.id);
    return map(grouped, (units, unitID) => ({
        unitID,
        containers: toShopContainer(units.map((m) => m.shopModification))
    }));
};

const toContractPartyModificationUnit = (contractUnits: PartyModification[]): PartyModificationUnit[] => {
    const grouped = groupBy(contractUnits, (item) => item.contractModification.id);
    return map(grouped, (units, unitID) => ({
        unitID,
        containers: toContractContainers(units.map((m) => m.contractModification))
    }));
};

export const convert = (modificationUnits: PartyModification[]): PartyModificationUnitContainer[] => {
    const grouped = groupBy(modificationUnits, (item: PartyModification) => {
        const {shopModification, contractModification} = item;
        if (shopModification) {
            return UnitContainerType.ShopUnitContainer;
        }
        if (contractModification) {
            return UnitContainerType.ContractUnitContainer;
        }
        return UnitContainerType.unknown;
    });
    return map(grouped, (units, type) => {
        switch (type) {
            case UnitContainerType.ShopUnitContainer:
                return {
                    type: UnitContainerType.ShopUnitContainer,
                    units: toShopPartyModificationUnit(units)
                };
            case UnitContainerType.ContractUnitContainer:
                return {
                    type: UnitContainerType.ContractUnitContainer,
                    units: toContractPartyModificationUnit(units)
                };
            case UnitContainerType.unknown:
                return {
                    type: UnitContainerType.unknown
                };
        }
    });
};
