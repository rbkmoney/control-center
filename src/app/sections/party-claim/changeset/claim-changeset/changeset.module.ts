import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { PartyModificationFormsModule } from '../../../../party-modification-forms';
import { TimelineModule } from '../../../../shared/components/timeline';
import { ChangesetsFilterModule } from '../changesets-filter';
import { TimelineItemsModule } from '../timeline-items';
import { CommentTimelineItemModule } from '../timeline-items/comment-timeline-item/comment-timeline-item.module';
import { CreatedTimelineItemModule } from '../timeline-items/created-timeline-item';
import { FileTimelineItemModule } from '../timeline-items/file-timeline-item/file-timeline-item.module';
import { PartyModificationTimelineItemModule } from '../timeline-items/party-modification-timeline-item/party-modification-timeline-item.module';
import { QuestionaryTimelineItemModule } from '../timeline-items/questionary-timeline-item/questionary-timeline-item.module';
import { StatusTimelineItemModule } from '../timeline-items/status-timeline-item/status-timeline-item.module';
import { EditClaimChangesetService } from '../unsaved-changeset/edit-claim-changeset.service';
import { SaveClaimChangesetService } from '../unsaved-changeset/save-claim-changeset.service';
import { UnsavedClaimChangesetComponent } from '../unsaved-changeset/unsaved-claim-changeset.component';
import { UnsavedClaimChangesetService } from '../unsaved-changeset/unsaved-claim-changeset.service';
import { ChangesetComponent } from './changeset.component';

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
        MatDialogModule,
        MatButtonModule,
        PartyModificationFormsModule,
    ],
    declarations: [ChangesetComponent, UnsavedClaimChangesetComponent],
    providers: [UnsavedClaimChangesetService, SaveClaimChangesetService, EditClaimChangesetService],
    exports: [ChangesetComponent, UnsavedClaimChangesetComponent],
})
export class ChangesetModule {}
