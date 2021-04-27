import { Pipe, PipeTransform } from '@angular/core';
import { getUnionKey } from '@cc/utils/get-union-key';

import {
    ContractModificationUnit,
    ContractorModificationUnit,
    PartyModification,
    ShopModificationUnit,
} from '../../../thrift-services/damsel/gen-model/claim_management';

function getContractorModificationName(mod: ContractorModificationUnit): string {
    switch (getUnionKey(mod.modification)) {
        case 'creation':
            return 'Contractor creation modification';
        default:
            return getUnionKey(mod.modification);
    }
}

function getShopModificationName(mod: ShopModificationUnit): string {
    switch (getUnionKey(mod.modification)) {
        case 'creation':
            return 'Shop creation modification';
        case 'category_modification':
            return 'Shop category modification';
        case 'contract_modification':
            return 'Shop contract modification';
        case 'details_modification':
            return 'Shop details modification';
        case 'location_modification':
            return 'Shop location modification';
        case 'payout_schedule_modification':
            return 'Shop payout schedule modification';
        case 'payout_tool_modification':
            return 'Shop payout tool modification';
        case 'shop_account_creation':
            return 'Shop account modification';
        case 'cash_register_modification_unit':
            return 'Cash register modification';
        default:
            return getUnionKey(mod.modification);
    }
}

function getContractModificationName(mod: ContractModificationUnit): string {
    switch (getUnionKey(mod.modification)) {
        case 'creation':
            return 'Contract creation modification';
        case 'contractor_modification':
            return 'Contract contractor modification';
        case 'payout_tool_modification':
            return 'Contract payout tool modification';
        case 'adjustment_modification':
            return 'Contract adjustment modification';
        case 'legal_agreement_binding':
            return 'Contract legal agreement binding modification';
        case 'report_preferences_modification':
            return 'Contract report preferences modification';
        case 'termination':
            return 'Contract termination modification';
        default:
            return getUnionKey(mod.modification);
    }
}

@Pipe({
    name: 'ccPartyModificationName',
})
export class PartyModificationNamePipe implements PipeTransform {
    public transform(partyMod: PartyModification): string {
        switch (getUnionKey(partyMod)) {
            case 'contract_modification':
                return getContractModificationName(partyMod.contract_modification);
            case 'contractor_modification':
                return getContractorModificationName(partyMod.contractor_modification);
            case 'shop_modification':
                return getShopModificationName(partyMod.shop_modification);
            default:
                return getUnionKey(partyMod);
        }
    }
}
