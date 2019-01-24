import { Component, Input } from '@angular/core';
import { Party } from '../../../gen-damsel/domain';

@Component({
    selector: 'cc-party-info',
    templateUrl: 'party-info.component.html'
})
export class PartyInfoComponent {
    @Input() party: Party;
}
