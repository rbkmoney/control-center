import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { forkJoin, merge, of, Subject } from 'rxjs';
import { catchError, filter, shareReplay, switchMap, tap } from 'rxjs/operators';
import * as uuid from 'uuid/v4';

import { KeycloakTokenInfoService } from '../../../../keycloak-token-info.service';
import { SHARE_REPLAY_CONF } from '../../../../shared/share-replay-conf';
import { Modification } from '../../../../thrift-services/damsel/gen-model/claim_management';
import { PartyID } from '../../../../thrift-services/damsel/gen-model/domain';
import { ConversationId, User } from '../../../../thrift-services/messages/gen-model/messages';
import { MessagesService } from '../../../../thrift-services/messages/messages.service';
import { createSingleMessageConversationParams } from '../../../../thrift-services/messages/utils';
import { SaveClaimChangesetService } from '../../changeset/unsaved-changeset/save-claim-changeset.service';
import { FetchClaimService } from '../../fetch-claim.service';

@Injectable()
export class SendCommentService {
    private hasError$: Subject<any> = new Subject();
    private sendComment$: Subject<{ partyID: PartyID; claimID: string }> = new Subject();

    form = this.fb.group({
        comment: ['', [Validators.maxLength(1000), Validators.required]],
    });

    comment$ = this.sendComment$.pipe(
        tap(() => this.hasError$.next()),
        switchMap(({ partyID, claimID }) => {
            const text = this.form.value.comment;
            const { name, email, sub } = this.keycloakTokenInfoService.decodedUserToken;
            const user: User = { fullname: name, email, user_id: sub };
            const conversation_id = uuid();
            const conversation = createSingleMessageConversationParams(conversation_id, text, sub);
            return forkJoin([
                of({ partyID, claimID }),
                of(conversation_id),
                this.messagesService.saveConversations([conversation], user).pipe(
                    catchError((e) => {
                        console.error(e);
                        this.snackBar.open(`There was an error when sending the message.`, 'OK', {
                            duration: 5000,
                        });
                        this.hasError$.next(e);
                        return of(e);
                    })
                ),
            ]);
        }),
        switchMap(([{ partyID, claimID }, conversationID]) =>
            forkJoin([
                of({ partyID, claimID }),
                this.saveClaimChangesetService.instantSave(
                    partyID,
                    claimID,
                    this.createModification(conversationID)
                ),
            ])
        ),
        filter(([{ partyID, claimID }, result]) => result !== 'error'),
        switchMap(([{ partyID, claimID }]) => this.fetchClaimService.getClaim(partyID, claimID)),
        shareReplay(SHARE_REPLAY_CONF)
    );

    inProgress$ = progress(this.sendComment$, merge(this.comment$, this.hasError$));

    constructor(
        private fb: FormBuilder,
        private messagesService: MessagesService,
        private keycloakTokenInfoService: KeycloakTokenInfoService,
        private snackBar: MatSnackBar,
        private saveClaimChangesetService: SaveClaimChangesetService,
        private fetchClaimService: FetchClaimService
    ) {
        this.inProgress$.subscribe((inProgress) => {
            if (inProgress) {
                this.form.controls.comment.disable();
            } else {
                this.form.controls.comment.enable();
            }
        });

        this.comment$.subscribe(() => {
            this.form.reset();
        });
    }

    sendComment(partyID: PartyID, claimID: string) {
        this.sendComment$.next({ partyID, claimID });
    }

    private createModification(id: ConversationId): Modification {
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
