import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

import { TimelineModule } from '../../../../shared/components/timeline';
import { CommentTimelineItemModule } from '../timeline-items/comment-timeline-item/comment-timeline-item.module';
import { FileTimelineItemModule } from '../timeline-items/file-timeline-item/file-timeline-item.module';
import { PartyModificationTimelineItemModule } from '../timeline-items/party-modification-timeline-item/party-modification-timeline-item.module';
import { QuestionaryTimelineItemModule } from '../timeline-items/questionary-timeline-item/questionary-timeline-item.module';
import { StatusTimelineItemModule } from '../timeline-items/status-timeline-item/status-timeline-item.module';
import { EditClaimChangesetService } from './edit-claim-changeset.service';
import { UnsavedClaimChangesetComponent } from './unsaved-claim-changeset.component';
import { UnsavedClaimChangesetService } from './unsaved-claim-changeset.service';

@NgModule({
    declarations: [UnsavedClaimChangesetComponent],
    imports: [
        TimelineModule,
        FlexModule,
        MatButtonModule,
        CommonModule,
        FileTimelineItemModule,
        CommentTimelineItemModule,
        PartyModificationTimelineItemModule,
        QuestionaryTimelineItemModule,
        StatusTimelineItemModule,
    ],
    providers: [EditClaimChangesetService, UnsavedClaimChangesetService],
    exports: [UnsavedClaimChangesetComponent],
})
export class UnsavedClaimChangesetModule {}
