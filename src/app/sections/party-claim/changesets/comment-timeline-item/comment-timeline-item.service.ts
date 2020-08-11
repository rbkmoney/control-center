import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { merge, ReplaySubject, Subject } from 'rxjs';
import { catchError, pluck, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { ConversationId } from '../../../../thrift-services/messages/gen-model/messages';
import { MessagesService } from '../../../../thrift-services/messages/messages.service';

@Injectable()
export class CommentTimelineItemService {
    getConversations$ = new ReplaySubject<ConversationId[]>();

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
    error$ = new Subject<string>();
    isLoading$ = progress(this.getConversations$, merge(this.conversations$, this.error$));

    constructor(private messagesService: MessagesService) {
        this.getConversations$.subscribe();
    }

    getConversations(conversationIDs: ConversationId[]) {
        this.getConversations$.next(conversationIDs);
    }
}
