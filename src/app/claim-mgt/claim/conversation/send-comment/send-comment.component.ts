import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { SendCommentService } from './send-comment.service';

@Component({
    selector: 'cc-send-comment',
    templateUrl: 'send-comment.component.html',
    styleUrls: ['send-comment.component.scss'],
    providers: [SendCommentService],
})
export class SendCommentComponent implements OnInit {
    @Output() conversationSaved: EventEmitter<Modification[]> = new EventEmitter();

    @Input()
    disabled?: boolean;

    form: FormGroup = this.sendCommentService.form;
    inProgress$ = this.sendCommentService.inProgress$;

    constructor(private sendCommentService: SendCommentService) {}

    ngOnInit(): void {
        this.sendCommentService.conversationSaved$.subscribe((id) =>
            this.conversationSaved.emit([this.sendCommentService.createModification(id)])
        );
        this.inProgress$.subscribe((inProgress) => {
            if (inProgress) {
                this.form.controls.comment.disable();
            } else {
                this.form.controls.comment.enable();
            }
        });
    }

    sendComment(v: string) {
        this.sendCommentService.sendComment(v);
    }
}
