import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { TimelineModule } from '../../../shared/components/timeline';
import { ChangesetsFilterModule } from './changesets-filter';
import { ClaimChangesetComponent } from './claim-changeset.component';
import { CommentTimelineItemModule } from './timeline-items/comment-timeline-item/comment-timeline-item.module';
import { CreatedTimelineItemModule } from './timeline-items/created-timeline-item';
import { FileTimelineItemModule } from './timeline-items/file-timeline-item/file-timeline-item.module';
import { PartyModificationTimelineItemModule } from './timeline-items/party-modification-timeline-item/party-modification-timeline-item.module';
import { QuestionaryTimelineItemModule } from './timeline-items/questionary-timeline-item/questionary-timeline-item.module';
import { StatusTimelineItemModule } from './timeline-items/status-timeline-item/status-timeline-item.module';
import { TimelineItemsModule } from './timeline-items/timeline-items.module';
import { UnsavedClaimChangesetComponent } from './unsaved-changeset/unsaved-claim-changeset.component';

@NgModule({
    imports: [
        FlexModule,
        CommonModule,
        ChangesetsFilterModule,
        TimelineItemsModule,
        TimelineModule,
        CreatedTimelineItemModule,
        FileTimelineItemModule,
        CommentTimelineItemModule,
        PartyModificationTimelineItemModule,
        QuestionaryTimelineItemModule,
        StatusTimelineItemModule,
    ],
    declarations: [ClaimChangesetComponent, UnsavedClaimChangesetComponent],
    exports: [ClaimChangesetComponent, UnsavedClaimChangesetComponent],
})
export class ClaimChangesetModule {}
