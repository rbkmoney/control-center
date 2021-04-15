import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/utils';
import { merge, of, Subject } from 'rxjs';
import { catchError, pluck, shareReplay, switchMap } from 'rxjs/operators';

import { ConversationId } from '../../../../../thrift-services/messages/gen-model/messages';
import { MessagesService } from '../../../../../thrift-services/messages/messages.service';

@Injectable()
export class CommentTimelineItemService {
    private getConversations$ = new Subject<ConversationId[]>();
    private hasError$ = new Subject<string>();

    message$ = this.getConversations$.pipe(
        switchMap((conversationIDs) =>
            this.messagesService.getConversations(conversationIDs, {}).pipe(
                pluck('conversations', '0', 'messages', '0'),
                catchError((e) => {
                    this.hasError$.next(e);
                    return of(e);
                })
            )
        ),
        shareReplay(1)
    );
    error$ = this.hasError$.asObservable();

    isLoading$ = progress(this.getConversations$, merge(this.message$, this.hasError$));

    constructor(private messagesService: MessagesService) {
        this.message$.subscribe();
    }

    getMessage(conversationIDs: ConversationId[]) {
        this.getConversations$.next(conversationIDs);
    }
}
