import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ccPartyModificationName',
})
export class PartyModificationNamePipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'contractCreation':
                return 'Contract creation';
            case 'payoutToolCreation':
                return 'Payout tool creation';
            case 'shopCreation':
                return 'Shop creation';
            default:
                return value;
        }
    }
}
