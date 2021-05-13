import { Pipe, PipeTransform } from '@angular/core';

import { TargetType } from './targe-type';

@Pipe({
    name: 'ccPartyItemName',
})
export class PartyItemNamePipe implements PipeTransform {
    transform(value: TargetType, ...args: any[]): any {
        switch (value) {
            case TargetType.PartyItem: {
                const name = args.length > 0 ? args[0] : 'item';
                return `Select ${name} from party or claim`;
            }
            case TargetType.FillIn:
                return 'Fill in party modification unit ID';
            default:
                return value;
        }
    }
}
