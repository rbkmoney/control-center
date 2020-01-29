import { Pipe, PipeTransform } from '@angular/core';
import { ShopModificationName } from './shop-modification-name';
import { ContractModificationName } from './contract-modification-name';

@Pipe({
    name: 'ccContainerName'
})
export class ContainerNamePipe implements PipeTransform {
    transform(value: any): any {
        switch (value) {
            case ShopModificationName.creation:
                return 'Shop creation';
            case ShopModificationName.category_modification:
                return 'Shop category modification';
            case ShopModificationName.details_modification:
                return 'Shop details modification';
            case ShopModificationName.contract_modification:
                return 'Shop contract modification';
            case ShopModificationName.payout_tool_modification:
                return 'Shop payout tool modification';
            case ShopModificationName.location_modification:
                return 'Shop location modification';
            case ShopModificationName.shop_account_creation:
                return 'Shop account creation';
            case ShopModificationName.payout_schedule_modification:
                return 'Shop schedule modification';

            case ContractModificationName.creation:
                return 'Contract creation';
            case ContractModificationName.legal_agreement_binding:
                return 'Contract legal agreement binding';
            case ContractModificationName.report_preferences_modification:
                return 'Contract report preferences modification';
            case ContractModificationName.adjustment_modification:
                return 'Contract adjustment modification';
            case ContractModificationName.payout_tool_modification:
                return 'Contract payout tool modification';
            case ContractModificationName.contractor_modification:
                return 'Contractor modification';
            case ContractModificationName.termination:
                return 'Contract termination';
            default:
                return value;
        }
    }
}
