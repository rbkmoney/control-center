import groupBy from 'lodash-es/groupBy';
import map from 'lodash-es/map';
import forIn from 'lodash-es/forIn';

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
import { reduce } from 'lodash-es';

export class PartyModificationContainerConverter {

    static convert(modificationUnits: PartyModification[]): PartyModificationUnitContainer[] {
        const {ShopModification, ContractModification} = groupBy(modificationUnits, (item: PartyModification) => {
            const {shopModification, contractModification} = item;
            if (shopModification) {
                return PartyModificationUnitType.ShopModification;
            }
            if (contractModification) {
                return PartyModificationUnitType.ContractModification;
            }
            return PartyModificationUnitType.unknown;
        });
        const result = [];
        if (ShopModification) {
            result.push({
                type: PartyModificationUnitContainerType.ShopUnitContainer,
                units: this.convertToPartyModificationUnit(ShopModification, PartyModificationUnitType.ShopModification)
            });
        }
        if (ContractModification) {
            result.push({
                type: PartyModificationUnitContainerType.ContractUnitContainer,
                units: this.convertToPartyModificationUnit(ContractModification, PartyModificationUnitType.ContractModification)
            });
        }
        return result;
    }

    private static convertToPartyModificationUnit(modificationUnits: PartyModification[], type: PartyModificationUnitType): PartyModificationUnit[] {
        const grouped = groupBy(modificationUnits, (item: PartyModification) => {
            const {shopModification, contractModification} = item;
            if (shopModification) {
                return shopModification.id;
            }
            if (contractModification) {
                return contractModification.id;
            }
        });
        const result = [];
        forIn(grouped, (value, key) => {
            result.push({
                unitID: key,
                containers: reduce(value, (acc, item) => {
                    switch (type) {
                        case PartyModificationUnitType.ShopModification:
                            return acc.concat(this.resolveShopContainers([item]));
                        case PartyModificationUnitType.ContractModification:
                            return acc.concat(this.resolveContractContainers([item]));
                    }
                }, []),
                type
            });
        });
        return result;
    }

    private static resolveContractContainers(contracts: PartyModification[]) {
        const modifications = contracts.map((modification) => modification.contractModification);
        return this.toContractContainers(modifications);
    }

    private static resolveShopContainers(shops: PartyModification[]) {
        const modifications = shops.map((modification) => modification.shopModification);
        return this.toShopContainer(modifications);
    }

    private static toContractContainers(modification: ContractModificationUnit[]): PartyModificationContainer[] {
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
