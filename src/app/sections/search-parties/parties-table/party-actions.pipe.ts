import { Pipe, PipeTransform } from '@angular/core';

import { PartyActions } from './party-actions';

const partyActionNames: { [N in PartyActions]: string } = {
    [PartyActions.navigateToParty]: 'Merchant Details',
};

@Pipe({
    name: 'ccPartyActions',
})
export class PartyActionsPipe implements PipeTransform {
    transform(action: string): string {
        return partyActionNames[action] || action;
    }
}
