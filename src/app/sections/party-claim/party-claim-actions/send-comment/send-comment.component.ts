import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

    form: FormGroup = this.sendCommentService.form;
    inProgress$ = this.sendCommentService.inProgress$;

    constructor(private sendCommentService: SendCommentService) {}

    sendComment() {
        this.sendCommentService.sendComment();
    }
}
