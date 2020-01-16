import { Component, Input } from '@angular/core';

import { CommentService } from './comment.service';
import { Conversation } from '../../../../thrift-services/messages/gen-model/messages';

@Component({
    selector: 'cc-conversation-comment',
    templateUrl: 'comment.component.html',
    styleUrls: ['comment.component.scss'],
    providers: [CommentService]
})
export class CommentComponent {
    @Input() conversation: Conversation;
}
