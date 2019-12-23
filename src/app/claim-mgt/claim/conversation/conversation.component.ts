import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Claim } from '../../../gen-damsel/claim_management';
import { toTimelineInfo } from './to-timeline-info';
import { TimelineItemInfo } from './to-timeline-info/model';
import { getUnionKey } from '../../../shared/get-union-key';

@Component({
    selector: 'cc-claim-conversation',
    templateUrl: 'conversation.component.html'
})
export class ConversationComponent implements OnChanges {
    @Input() claim: Claim;

    timelineInfo$ = new BehaviorSubject<TimelineItemInfo[]>([]);

    ngOnChanges(changes: SimpleChanges): void {
        const { currentValue } = changes.claim;
        if (currentValue) {
            this.timelineInfo$.next(toTimelineInfo(currentValue.changeset));
        }
    }

    getKey(u: any): string {
        return getUnionKey(u);
    }
}
