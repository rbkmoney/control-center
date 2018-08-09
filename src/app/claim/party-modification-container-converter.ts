import groupBy from 'lodash-es/groupBy';
import reduce from 'lodash-es/reduce';
import map from 'lodash-es/map';

import {
    PartyModification,
    ShopModification,
    ContractModification
} from '../backend/model/damsel';
import {
    PartyModificationUnitType,
    PartyModificationContainer,
    PartyModificationUnit,
    ContractModificationName,
    ShopModificationName
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
        const {unitID, modifications} = this.toModificationChunk(contracts, 'contractModification');
        return {unitID, containers: this.toContractContainers(modifications)};
    }

    private static resolveShopContainers(shops: PartyModification[]) {
        const {unitID, modifications} = this.toModificationChunk(shops, 'shopModification');
        return {unitID, containers: this.toShopContainer(modifications)};
    }

    private static toModificationChunk(modifications: PartyModification[], type: 'contractModification' | 'shopModification') {
        return modifications.reduce((result, item) => {
            const {id, modification} = item[type];
            result.unitID = id; // TODO need to check
            result.modifications.push(modification);
            return result;
        }, {unitID: null, modifications: []});
    }

    private static toContractContainers(modification: ContractModification[]): PartyModificationContainer[] {
        const grouped = groupBy(modification, (item: ContractModification) => {
            const {
                creation,
                termination,
                adjustmentModification,
                payoutToolModification,
                legalAgreementBinding,
                reportPreferencesModification
            } = item;
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
            // TODO check undefined
        });
        return map(grouped, (modifications, name: ContractModificationName) => ({name, modifications}));
    }

    private static toShopContainer(modification: ShopModification[]): PartyModificationContainer[] {
        const grouped = groupBy(modification, (item: ShopModification) => {
            const {
                creation,
                categoryModification,
                detailsModification,
                contractModification,
                payoutToolModification,
                locationModification,
                shopAccountCreation,
                payoutScheduleModification
            } = item;
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
            // TODO check undefined
        });
        return map(grouped, (modifications, name: ShopModificationName) => ({name, modifications}));
    }
}
