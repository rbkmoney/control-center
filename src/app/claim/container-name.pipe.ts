import { Pipe, PipeTransform } from '@angular/core';

import {
    PartyModificationContainerType,
    ShopModificationName,
    ContractModificationName
} from './model';

@Pipe({
    name: 'ccContainerName'
})
export class ContainerNamePipe implements PipeTransform {

    transform(value: any, ...args: any[]): any {
        if (args.length < 1) {
            return value;
        }
        const type = args[0] as PartyModificationContainerType;
        switch (type) {
            case PartyModificationContainerType.ShopModification:
                return this.transformShopModification(value);
            case PartyModificationContainerType.ContractModification:
                return this.transformContractModificationName(value);
            default:
                return value;
        }
    }

    private transformShopModification(value: ShopModificationName): string {
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
                return 'Shop payout schedule modification';
            default:
                return value;
        }

    }

    private transformContractModificationName(value: ContractModificationName): string {
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
