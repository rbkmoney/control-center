import { Component } from '@angular/core';

import { TimelineAction } from '../timeline-action';

@Component({
    selector: 'cc-party-modification-timeline-item',
    templateUrl: 'party-modification-timeline-item.component.html',
})
export class PartyModificationTimelineItemComponent {
    timelineAction = TimelineAction;
    testMod = {
        shop_modification: {
            id: '6d3fd2b0-7ef6-4607-a73f-112ef27e25cb',
            modification: { category_modification: { id: 100 } },
        },
    };
}
