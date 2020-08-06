import { Component, Input } from '@angular/core';

import { PartyModification } from '../../../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-party-modification-content',
    templateUrl: 'party-modification-content.component.html',
})
export class PartyModificationContentComponent {
    @Input()
    expanded = false;

    @Input()
    modification: PartyModification;
}
