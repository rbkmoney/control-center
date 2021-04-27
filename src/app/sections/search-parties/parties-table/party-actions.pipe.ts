import { Pipe, PipeTransform } from '@angular/core';

import { PartyActions } from './party-actions';

const PARTY_ACTION_NAMES: { [N in PartyActions]: string } = {
    [PartyActions.NavigateToParty]: 'Merchant Details',
};

@Pipe({
    name: 'ccPartyActions',
})
export class PartyActionsPipe implements PipeTransform {
    transform(action: string): string {
        return PARTY_ACTION_NAMES[action] || action;
    }
}
