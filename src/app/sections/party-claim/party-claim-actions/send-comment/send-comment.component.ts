import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { SendCommentService } from './send-comment.service';

@Component({
    selector: 'cc-send-comment',
    templateUrl: 'send-comment.component.html',
    styleUrls: ['send-comment.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SendCommentService],
})
export class SendCommentComponent {
    @Input()
    disabled?: boolean;

    @Input()
    partyID: PartyID;

    @Input()
    claimID: string;

    form: FormGroup = this.sendCommentService.form;
    inProgress$ = this.sendCommentService.inProgress$;

    constructor(private sendCommentService: SendCommentService) {}

    sendComment() {
        this.sendCommentService.sendComment(this.partyID, this.claimID);
    }
}
