import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ccPartyModificationName',
})
export class PartyModificationNamePipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'contractor.individual_entity':
                return 'Individual entity';
            case 'contractor.legal_entity':
                return 'Legal entity';
            case 'bank_account.russian_bank_account':
                return 'Russian bank account';
            case 'shop_info.location':
                return 'Shop location';
            case 'shop_info.details':
                return 'Shop details';
            default:
                return value;
        }
    }
}
