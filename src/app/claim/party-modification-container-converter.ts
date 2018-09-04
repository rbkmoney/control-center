import groupBy from 'lodash-es/groupBy';
import map from 'lodash-es/map';

import { ContractModificationUnit, PartyModification, ShopModificationUnit } from '../damsel';
import {
    ContractModificationName,
    PartyModificationContainer,
    PartyModificationContainerType,
    PartyModificationUnit,
    PartyModificationUnitContainer, PartyModificationUnitContainerType,
    PartyModificationUnitType,
    ShopModificationName
} from './model';

const convertToPartyModificationUnit = (modificationUnits: PartyModification[], type: PartyModificationUnitType): PartyModificationUnit[] => {
    const grouped = groupBy(modificationUnits, (item: PartyModification) => {
        const {shopModification, contractModification} = item;
        if (shopModification) {
            return shopModification.id;
        }
        if (contractModification) {
            return contractModification.id;
        }
    });
    return map(grouped, (value, key) => {
        let containers;
        switch (type) {
            case PartyModificationUnitType.ShopModification:
                containers = resolveShopContainers(value);
                break;
            case PartyModificationUnitType.ContractModification:
                containers = resolveContractContainers(value);
                break;
        }
        return {
            unitID: key,
            containers,
            type
        };
    });
};

const resolveContractContainers = (contracts: PartyModification[]) => {
    const modifications = contracts.map((modification) => modification.contractModification);
    return toContractContainers(modifications);
};

const resolveShopContainers = (shops: PartyModification[]) => {
    const modifications = shops.map((modification) => modification.shopModification);
    return toShopContainer(modifications);
};

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
        type: PartyModificationContainerType.ContractModification,
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
        type: PartyModificationContainerType.ShopModification,
        name,
        modifications
    }));
};

export function convertToPartyModificationContainer(modificationUnits: PartyModification[]): PartyModificationUnitContainer[] {
    const grouped = groupBy(modificationUnits, (item: PartyModification) => {
        const {shopModification, contractModification} = item;
        if (shopModification) {
            return PartyModificationUnitType.ShopModification;
        }
        if (contractModification) {
            return PartyModificationUnitType.ContractModification;
        }
        return PartyModificationUnitType.unknown;
    });
    return map(grouped, (value, key) => {
        switch (key) {
            case PartyModificationUnitType.ShopModification:
                return {
                    type: PartyModificationUnitContainerType.ShopUnitContainer,
                    units: convertToPartyModificationUnit(value, key)
                };
            case PartyModificationUnitType.ContractModification:
                return {
                    type: PartyModificationUnitContainerType.ContractUnitContainer,
                    units: convertToPartyModificationUnit(value, key)
                };
        }
    });
}
