import { Pipe, PipeTransform } from '@angular/core';

import {
    ContractModificationName,
    ShopModificationName,
} from '../../../../party-modification-creator/model';
import { getUnionKey } from '../../../../shared/utils';
import { PartyModification } from '../../../../thrift-services/damsel/gen-model/claim_management';

@Pipe({
    name: 'ccPartyModificationName',
})
export class PartyModificationNamePipe implements PipeTransform {
    transform(value: PartyModification): string {
        const modification = value[getUnionKey(value)].modification;
        const key = getUnionKey(modification);

        switch (getUnionKey(value)) {
            case 'shop_modification':
                return this.transformShopModification(key);
            case 'contract_modification':
                return this.transformContractModificationName(key);
            default:
                return key;
        }
    }

    private transformShopModification(value: string): string {
        switch (value) {
            case ShopModificationName.creation:
                return 'Shop creation';
            case ShopModificationName.categoryModification:
                return 'Shop category modification';
            case ShopModificationName.detailsModification:
                return 'Shop details modification';
            case ShopModificationName.contractModification:
                return 'Shop contract modification';
            case ShopModificationName.payoutToolModification:
                return 'Shop payout tool modification';
            case ShopModificationName.locationModification:
                return 'Shop location modification';
            case ShopModificationName.shopAccountCreation:
                return 'Shop account creation';
            case ShopModificationName.payoutScheduleModification:
                return 'Shop schedule modification';
            default:
                return value;
        }
    }

    private transformContractModificationName(value: string): string {
        switch (value) {
            case ContractModificationName.creation:
                return 'Contract creation';
            case ContractModificationName.termination:
                return 'Contract termination';
            case ContractModificationName.adjustmentModification:
                return 'Contract adjustment modification';
            case ContractModificationName.payoutToolModification:
                return 'Contract payout tool modification';
            case ContractModificationName.legalAgreementBinding:
                return 'Contract legal agreement binding';
            case ContractModificationName.reportPreferencesModification:
                return 'Contract report preferences modification';
            default:
                return value;
        }
    }
}
