import { Pipe, PipeTransform } from '@angular/core';

import { TargetType } from './targe-type';

@Pipe({
    name: 'ccPartyItemName'
})
export class PartyItemNamePipe implements PipeTransform {

    transform(value: TargetType, ...args: any[]): any {
        switch (value) {
            case TargetType.partyItem:
                const name = args.length > 0 ? args[0] : 'item';
                return `Select party ${name}`;
            case TargetType.fillIn:
                return 'Fill in party modification unit ID';
            default:
                return value;
        }
    }
}
