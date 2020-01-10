import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Claim } from '../../../thrift-services/damsel/gen-model/claim_management';
import { toTimelineInfo } from './to-timeline-info';
import { TimelineAction, TimelineItemInfo } from './to-timeline-info/model';
import { getUnionKey } from '../../../shared/get-union-key';

export interface TimelineActionType {
    name: string;
    actions: TimelineAction[];
}

const timelineActionTypes: TimelineActionType[] = [
    { name: 'change', actions: [TimelineAction.changesAdded] },
    { name: 'file attachment', actions: [TimelineAction.filesAdded] },
    { name: 'comment', actions: [TimelineAction.commentAdded] },
    {
        name: 'status change', actions:
            [
                TimelineAction.statusAccepted,
                TimelineAction.statusDenied,
                TimelineAction.statusPending,
                TimelineAction.statusReview,
                TimelineAction.statusRevoked
            ]
    }
];

@Component({
    selector: 'cc-claim-conversation',
    templateUrl: 'conversation.component.html'
})
export class ConversationComponent implements OnChanges {
    @Input() claim: Claim;

    timelineInfo: TimelineItemInfo[] = [];

    filteredTimelineInfo: TimelineItemInfo[] = [];

    timelineActionTypes = timelineActionTypes;

    ngOnChanges(changes: SimpleChanges) {
        const { currentValue } = changes.claim;
        if (currentValue) {
            this.timelineInfo = toTimelineInfo(currentValue.changeset);
            this.filteredTimelineInfo = this.timelineInfo;
        }
    }

    selectFilter(value: TimelineActionType[]) {
        const filters = this.getFilterValues(value);
        if (filters.length) {
            this.filteredTimelineInfo = this.timelineInfo.filter(i => filters.includes(i.action))
        } else {
            this.filteredTimelineInfo = this.timelineInfo;
        }
    }

    private getFilterValues(value: TimelineActionType[]): TimelineAction[] {
        return ([] as TimelineAction[]).concat(...value.map(i => i.actions));
    }

    getKey(u: any): string {
        return getUnionKey(u);
    }
}
