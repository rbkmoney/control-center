import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { DetailsItemModule } from '../../../shared/components/details-item';
import { TimelineModule } from '../../../shared/components/timeline';
import { HumanizeDurationModule } from '../../../shared/humanize-duration';
import { SharedModule } from '../../../shared/shared.module';
import { ActionIconPipe } from './claim-changeset/action-icon.pipe';
import { ActionNamePipe } from './claim-changeset/action-name.pipe';
import { ClaimChangesetComponent } from './claim-changeset/claim-changeset.component';
import { ClaimTimelineItemComponent } from './claim-timeline-item/claim-timeline-item.component';
import { CommentContentComponent } from './comment-timeline-item/comment-content/comment-content.component';
import { CommentTimelineItemComponent } from './comment-timeline-item/comment-timeline-item.component';
import { CreatedTimelineItemComponent } from './created-timeline-item';
import { FileContentComponent } from './file-timeline-item/file-content/file-content.component';
import { FileTimelineItemComponent } from './file-timeline-item/file-timeline-item.component';
import { PartyModificationTimelineItemComponent } from './party-modification-timeline-item';
import { PartyModificationContentComponent } from './party-modification-timeline-item/party-modification-content/party-modification-content.component';
import { QuestionaryTimelineItemComponent, SerialNumberPipe } from './questionary-timeline-item';
import { QuestionaryContentComponent } from './questionary-timeline-item/questionary-content/questionary-content.component';
import { ReasonContentComponent } from './status-timeline-item/reason-content/reason-content.component';
import { StatusTimelineItemComponent } from './status-timeline-item/status-timeline-item.component';
import { TimelineItemErrorComponent } from './timeline-item-error/timeline-item-error.component';
import { TimelineItemLoadingComponent } from './timeline-item-loading/timeline-item-loading.component';
import { UnsavedClaimChangesetComponent } from './unsaved-claim-changeset/unsaved-claim-changeset.component';

@NgModule({
    imports: [
        TimelineModule,
        MatFormFieldModule,
        MatSelectModule,
        FlexModule,
        MatCardModule,
        SharedModule,
        CommonModule,
        HumanizeDurationModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        DetailsItemModule,
        MatDividerModule,
        MatExpansionModule,
    ],
    declarations: [
        ClaimChangesetComponent,
        UnsavedClaimChangesetComponent,
        ActionIconPipe,
        ActionNamePipe,
        CreatedTimelineItemComponent,
        QuestionaryTimelineItemComponent,
        PartyModificationTimelineItemComponent,
        StatusTimelineItemComponent,
        FileTimelineItemComponent,
        CommentTimelineItemComponent,
        SerialNumberPipe,
        TimelineItemLoadingComponent,
        TimelineItemErrorComponent,
        CommentContentComponent,
        ClaimTimelineItemComponent,
        FileContentComponent,
        QuestionaryContentComponent,
        PartyModificationContentComponent,
        ReasonContentComponent,
    ],
    exports: [ClaimChangesetComponent, UnsavedClaimChangesetComponent],
})
export class ChangesetsModule {}
