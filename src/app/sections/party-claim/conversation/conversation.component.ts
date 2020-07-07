import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Int64 from 'thrift-ts/lib/int64';

import { getUnionKey } from '../../../shared/utils';
import { Claim, Modification } from '../../../thrift-services/damsel/gen-model/claim_management';
import { TimelineAction, TimelineItemInfo } from './to-timeline-info/model';

@Component({
    selector: 'cc-conversation',
    templateUrl: 'conversation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationComponent {
    @Input()
    claim: Claim = {
        id: new Int64(123),
        party_id: '31123231231123123231321213',
        status: {
            review: {},
        },
        changeset: [],
        revision: 123,
        created_at: '2013-04-01T00:00:00.000',
    };

    timelineInfos$ = new BehaviorSubject<TimelineItemInfo[]>([
        {
            action: TimelineAction.partyModificationAdded,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.documentAdded,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.filesAdded,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.filesDeleted,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.commentAdded,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.commentDeleted,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.statusReview,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.statusPending,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.statusDenied,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.statusRevoked,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
        {
            action: TimelineAction.statusAccepted,
            user_info: {
                id: '123',
                email: 'kekeke@keke.kek',
                username: 'ekekeke',
                type: {
                    internal_user: {},
                },
            },
            created_at: '2013-04-01T00:00:00.000',
            modifications: [],
        },
    ]);

    timelineAction = TimelineAction;

    getKey(modification: Modification) {
        return getUnionKey(modification);
    }
}
