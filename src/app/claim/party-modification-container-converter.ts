import groupBy from 'lodash-es/groupBy';
import reduce from 'lodash-es/reduce';
import map from 'lodash-es/map';

import {
    PartyModification,
    ShopModificationUnit,
    ContractModificationUnit
} from '../damsel';
import {
    PartyModificationUnitType,
    PartyModificationContainer,
    PartyModificationUnit,
    ContractModificationName,
    ShopModificationName,
    PartyModificationContainerType
} from './model';

export class PartyModificationContainerConverter {

    static convert(modificationUnits: PartyModification[]): PartyModificationUnit[] {
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
        return reduce(grouped, (result, group, type) => {
            switch (type) {
                case PartyModificationUnitType.ContractModification:
                    result.push({type, ...this.resolveContractContainers(group)});
                    break;
                case PartyModificationUnitType.ShopModification:
                    result.push({type, ...this.resolveShopContainers(group)});
                    break;
            }
            return result;
        }, []);
    }

    private static resolveContractContainers(contracts: PartyModification[]) {
        const modifications = contracts.map((modification) => modification.contractModification);
        return {containers: this.toContractContainers(modifications)};
    }

    private static resolveShopContainers(shops: PartyModification[]) {
        const modifications = shops.map((modification) => modification.shopModification);
        return {containers: this.toShopContainer(modifications)};
    }

    private static toContractContainers(modification: ContractModificationUnit[]): PartyModificationContainer[] {
        const grouped = groupBy(modification, (item: ContractModificationUnit) => {
            const {
                creation,
                termination,
                adjustmentModification,
                payoutToolModification,
                legalAgreementBinding,
                reportPreferencesModification,
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
    }

    private static toShopContainer(modification: ShopModificationUnit[]): PartyModificationContainer[] {
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
    }
}
