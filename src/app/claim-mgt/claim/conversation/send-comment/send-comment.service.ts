import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject, of, forkJoin, BehaviorSubject, Observable, merge, from } from 'rxjs';
import { switchMap, filter, catchError, pluck, tap } from 'rxjs/operators';
import * as uuid from 'uuid/v4';
import get from 'lodash-es/get';

import { ConversationId, User } from '../../../../thrift-services/messages/gen-model/messages';
import { MessagesService } from '../../../../thrift-services/messages/messages.service';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { createSingleMessageConversationParams } from '../../../../thrift-services/messages/utils';
import { KeycloakTokenInfoService } from '../../../../keycloak-token-info.service';
import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';

@Injectable()
export class SendCommentService {
    private conversationId$: BehaviorSubject<ConversationId | null> = new BehaviorSubject(null);
    private error$: BehaviorSubject<any> = new BehaviorSubject({ hasError: false });
    private sendComment$: Subject<string> = new Subject();

    form: FormGroup;
    conversationSaved$: Observable<ConversationId> = this.conversationId$.pipe(filter(id => !!id));
    errorCode$: Observable<string> = this.error$.pipe(pluck('code'));
    inProgress$: Observable<boolean> = progress(
        this.sendComment$,
        merge(this.conversationId$, this.error$)
    );

    constructor(
        private fb: FormBuilder,
        private messagesService: MessagesService,
        private keycloakTokenInfoService: KeycloakTokenInfoService
    ) {
        this.form = this.fb.group({
            comment: ['', [Validators.maxLength(1000)]]
        });

        this.sendComment$
            .pipe(
                tap(() => this.error$.next({ hasError: false })),
                switchMap(text => {
                    const { name, email, sub } = this.keycloakTokenInfoService.decodedUserToken;
                    const user = { fullname: name, email, user_id: sub } as User;
                    const conversation_id = uuid();
                    const conversation = createSingleMessageConversationParams(
                        conversation_id,
                        text,
                        sub
                    );
                    return forkJoin(
                        of(conversation_id),
                        this.messagesService.saveConversations([conversation], user).pipe(
                            catchError(ex => {
                                console.error(ex);
                                const error = { hasError: true, code: 'saveConversationsFailed' };
                                this.error$.next(error);
                                return of(error);
                            })
                        )
                    );
                }),
                filter(([, res]) => get(res, ['hasError']) !== true)
            )
            .subscribe(([conversation_id]) => {
                this.conversationId$.next(conversation_id);
                this.form.reset();
            });
    }

    sendComment(comment: string) {
        if (comment.length === 0) {
            return;
        }
        this.sendComment$.next(comment);
    }

    createModification(id: ConversationId): Modification {
        return {
            claim_modification: {
                comment_modification: {
                    id,
                    modification: {
                        creation: {}
                    }
                }
            }
        };
    }
}
