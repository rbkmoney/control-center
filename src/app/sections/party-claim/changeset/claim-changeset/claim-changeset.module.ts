import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { TimelineModule } from '@cc/components/timeline';

import { PartyModificationFormsModule } from '../../../../shared/components/party-modification-forms';
import { ChangesetsFilterModule } from '../changesets-filter';
import { CommentTimelineItemModule } from '../timeline-items/comment-timeline-item/comment-timeline-item.module';
import { CreatedTimelineItemModule } from '../timeline-items/created-timeline-item';
import { FileTimelineItemModule } from '../timeline-items/file-timeline-item/file-timeline-item.module';
import { PartyModificationTimelineItemModule } from '../timeline-items/party-modification-timeline-item/party-modification-timeline-item.module';
import { QuestionaryTimelineItemModule } from '../timeline-items/questionary-timeline-item/questionary-timeline-item.module';
import { StatusTimelineItemModule } from '../timeline-items/status-timeline-item/status-timeline-item.module';
import { SaveClaimChangesetService } from '../unsaved-changeset/save-claim-changeset.service';
import { ClaimChangesetComponent } from './claim-changeset.component';

@NgModule({
    imports: [
        FlexModule,
        CommonModule,
        ChangesetsFilterModule,
        TimelineModule,
        MatDialogModule,
        MatButtonModule,
        PartyModificationFormsModule,
        CreatedTimelineItemModule,
        FileTimelineItemModule,
        CommentTimelineItemModule,
        PartyModificationTimelineItemModule,
        QuestionaryTimelineItemModule,
        StatusTimelineItemModule,
    ],
    declarations: [ClaimChangesetComponent],
    providers: [SaveClaimChangesetService],
    exports: [ClaimChangesetComponent],
})
export class ClaimChangesetModule {}
