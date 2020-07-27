import { Pipe, PipeTransform } from '@angular/core';

import { ContractModificationName, ModificationGroupType, ShopModificationName } from '../model';
import { ContractorModificationName } from '../model/contractor-modification-name';

@Pipe({
    name: 'ccModificationName',
})
export class ModificationNamePipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
        if (args.length < 1) {
            return value;
        }
        const type = args[0] as ModificationGroupType;
        switch (type) {
            case ModificationGroupType.ShopUnitContainer:
                return this.transformShopModification(value);
            case ModificationGroupType.ContractUnitContainer:
                return this.transformContractModificationName(value);
            case ModificationGroupType.ContractorUnitContainer:
                return this.transformContractorModification(value);
            default:
                return value;
        }
    }

    private transformContractorModification(value: ContractorModificationName): string {
        switch (value) {
            case ContractorModificationName.creation:
                return 'Contractor creation';
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
                return 'Shop schedule modification';
            default:
                return value;
        }
    }

    private transformContractModificationName(value: ContractModificationName): string {
        switch (value) {
            case ContractModificationName.legacyCreation:
                return 'Contract creation (legacy)';
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
