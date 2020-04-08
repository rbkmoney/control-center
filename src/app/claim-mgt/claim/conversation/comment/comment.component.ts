import { Component, Input } from '@angular/core';

import { Conversation } from '../../../../thrift-services/messages/gen-model/messages';

@Component({
    selector: 'cc-conversation-comment',
    templateUrl: 'comment.component.html',
    styleUrls: ['comment.component.scss'],
})
export class CommentComponent {
    @Input() conversation: Conversation;
}
