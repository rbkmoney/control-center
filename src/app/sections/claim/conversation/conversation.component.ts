import { Component, Input } from '@angular/core';
import { Claim, ClaimChangeset, Modification } from '../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-conversation',
    templateUrl: 'conversation.component.html'
})
export class ConversationComponent {
    @Input()
    @Input() changeset: ClaimChangeset;
}