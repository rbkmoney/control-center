import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessagesService } from '../../../../thrift-services/messages/messages.service';
import { ConversationStatus } from '../../../../thrift-services/messages/gen-model/messages';

@Injectable()
export class CommentService {
    comment$ = new Subject<string>();

    constructor(private messagesService: MessagesService) {}

    getComment(id: string) {
        this.messagesService
            .getConversations([id], { conversation_status: ConversationStatus.ACTUAL })
            .subscribe(conversation => {
                this.comment$.next(conversation.conversations[0].messages[0].text);
            });
    }
}
