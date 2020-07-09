import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Modification } from '../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-send-comment',
    templateUrl: 'send-comment.component.html',
    styleUrls: ['send-comment.component.scss'],
})
export class SendCommentComponent {
    @Output() changesetSaved: EventEmitter<Modification[]> = new EventEmitter();

    @Input()
    disabled?: boolean;
}
