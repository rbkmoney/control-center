import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { Subject } from 'rxjs';
import { catchError, pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { ConversationId } from '../../../../thrift-services/messages/gen-model/messages';
import { MessagesService } from '../../../../thrift-services/messages/messages.service';

@Injectable()
export class CommentTimelineItemService {
    getConversations$ = new Subject<ConversationId[]>();

    conversations$ = this.getConversations$.pipe(
        startWith([]),
        switchMap((conversationIDs) =>
            this.messagesService.getConversations(conversationIDs, {}).pipe(
                pluck('conversations'),
                catchError((e) => {
                    this.error$.next(e);
                    return [];
                })
            )
        ),
        shareReplay(1)
    );
    isLoading$ = progress(this.getConversations$, this.conversations$);
    error$ = new Subject<string>();

    constructor(private messagesService: MessagesService) {
        this.getConversations$.subscribe();
    }

    getConversations(conversationIDs: ConversationId[]) {
        this.getConversations$.next(conversationIDs);
    }
}
