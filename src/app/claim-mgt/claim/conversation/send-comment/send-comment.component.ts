import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { SendCommentService } from './send-comment.service';
import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';

@Component({
    selector: 'cc-send-comment',
    templateUrl: 'send-comment.component.html',
    styleUrls: ['send-comment.component.scss'],
    providers: [SendCommentService]
})
export class SendCommentComponent {
    @Output() conversationSaved: EventEmitter<Modification> = new EventEmitter();

    form: FormGroup = this.sendCommentService.form;
    inProgress$ = this.sendCommentService.inProgress$;

    constructor(private sendCommentService: SendCommentService) {
        this.sendCommentService.conversationSaved$.subscribe(id =>
            this.conversationSaved.next(sendCommentService.createModification(id))
        );
        this.inProgress$.subscribe(inProgress => {
            if (inProgress) {
                this.form.controls.comment.disable();
            } else {
                this.form.controls.comment.enable();
            }
        });
    }

    sendComment(comment: string) {
        this.sendCommentService.sendComment(comment);
    }
}
