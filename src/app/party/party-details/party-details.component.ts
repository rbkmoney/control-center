import { Component, Input } from '@angular/core';

import { Party } from '../../gen-damsel/domain';

@Component({
    selector: 'cc-party-details',
    templateUrl: 'party-details.component.html'
})
export class PartyDetailsComponent {
    @Input()
    party: Party;
}
