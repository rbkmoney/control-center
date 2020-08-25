import { NgModule } from '@angular/core';

import { TimelineModule } from '../../../../shared/components/timeline';
import { CommentTimelineItemModule } from './comment-timeline-item/comment-timeline-item.module';
import { CreatedTimelineItemModule } from './created-timeline-item';
import { FileTimelineItemModule } from './file-timeline-item/file-timeline-item.module';
import { PartyModificationTimelineItemModule } from './party-modification-timeline-item/party-modification-timeline-item.module';
import { QuestionaryTimelineItemModule } from './questionary-timeline-item/questionary-timeline-item.module';
import { StatusTimelineItemModule } from './status-timeline-item/status-timeline-item.module';

@NgModule({
    imports: [
        TimelineModule,
        CommentTimelineItemModule,
        PartyModificationTimelineItemModule,
        StatusTimelineItemModule,
        QuestionaryTimelineItemModule,
        FileTimelineItemModule,
        CreatedTimelineItemModule,
    ],
})
export class TimelineItemsModule {}
