import { Component, Input } from '@angular/core';
import { Party } from '../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-party-info',
    templateUrl: 'party-info.component.html'
})
export class PartyInfoComponent {
    @Input() party: Party;
}
