import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import get from 'lodash-es/get';
import { BehaviorSubject, forkJoin, merge, Observable, of, Subject } from 'rxjs';
import { catchError, filter, pluck, switchMap, tap } from 'rxjs/operators';
import * as uuid from 'uuid/v4';

import { KeycloakTokenInfoService } from '../../../../keycloak-token-info.service';
import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { ConversationId, User } from '../../../../thrift-services/messages/gen-model/messages';
import { MessagesService } from '../../../../thrift-services/messages/messages.service';
import { createSingleMessageConversationParams } from '../../../../thrift-services/messages/utils';

@Injectable()
export class SendCommentService {
    private conversationId$: BehaviorSubject<ConversationId | null> = new BehaviorSubject(null);
    private error$: BehaviorSubject<any> = new BehaviorSubject({ hasError: false });
    private sendComment$: Subject<string> = new Subject();

    form: FormGroup;

    conversationSaved$: Observable<ConversationId> = this.conversationId$.pipe(
        filter((id) => !!id)
    );
    errorCode$: Observable<string> = this.error$.pipe(pluck('code'));
    inProgress$: Observable<boolean> = progress(
        this.sendComment$,
        merge(this.conversationId$, this.error$)
    );

    constructor(
        private fb: FormBuilder,
        private messagesService: MessagesService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private snackBar: MatSnackBar
    ) {
        this.form = this.fb.group({
            comment: ['', [Validators.maxLength(1000)]],
        });

        this.sendComment$
            .pipe(
                tap(() => this.error$.next({ hasError: false })),
                switchMap((text) => {
                    const { name, email, sub } = this.keycloakTokenInfoService.decodedUserToken;
                    const user: User = { fullname: name, email, user_id: sub };
                    const conversation_id = uuid();
                    const conversation = createSingleMessageConversationParams(
                        conversation_id,
                        text,
                        sub
                    );
                    return forkJoin([
                        of(conversation_id),
                        this.messagesService.saveConversations([conversation], user).pipe(
                            catchError((ex) => {
                                console.error(ex);
                                this.snackBar.open(
                                    `There was an error sending a comment: ${ex}`,
                                    'OK',
                                    { duration: 5000 }
                                );
                                const error = { hasError: true, code: 'saveConversationsFailed' };
                                this.error$.next(error);
                                return of(error);
                            })
                        ),
                    ]);
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
                        creation: {},
                    },
                },
            },
        };
    }
}
