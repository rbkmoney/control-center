import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';

import { TimelineModule } from '../../../shared/components/timeline';
import { ChangesetsFilterModule } from './changesets-filter';
import { ClaimChangesetComponent } from './claim-changeset.component';
import { CommentTimelineItemModule } from './comment-timeline-item/comment-timeline-item.module';
import { CreatedTimelineItemModule } from './created-timeline-item';
import { FileTimelineItemModule } from './file-timeline-item/file-timeline-item.module';
import { PartyModificationTimelineItemModule } from './party-modification-timeline-item/party-modification-timeline-item.module';
import { SerialNumberPipe } from './questionary-timeline-item';
import { QuestionaryTimelineItemModule } from './questionary-timeline-item/questionary-timeline-item.module';
import { StatusTimelineItemModule } from './status-timeline-item/status-timeline-item.module';
import { UnsavedClaimChangesetComponent } from './unsaved-claim-changeset/unsaved-claim-changeset.component';

@NgModule({
    imports: [
        TimelineModule,
        FlexModule,
        CommonModule,
        ChangesetsFilterModule,
        CommentTimelineItemModule,
        PartyModificationTimelineItemModule,
        StatusTimelineItemModule,
        QuestionaryTimelineItemModule,
        FileTimelineItemModule,
        CreatedTimelineItemModule,
    ],
    declarations: [ClaimChangesetComponent, UnsavedClaimChangesetComponent, SerialNumberPipe],
    exports: [ClaimChangesetComponent, UnsavedClaimChangesetComponent],
})
export class ClaimChangesetModule {}
