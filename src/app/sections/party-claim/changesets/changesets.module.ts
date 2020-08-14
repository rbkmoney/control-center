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
import { AnkModule } from '../../../thrift-services/ank';
import { FileStorageModule } from '../../../thrift-services/file-storage';
import { MessagesModule } from '../../../thrift-services/messages';
import { ClaimChangesetComponent } from './claim-changeset/claim-changeset.component';
import { ClaimTimelineItemHeaderComponent } from './claim-timeline-item-header/claim-timeline-item-header.component';
import { CommentActionIconPipe } from './comment-timeline-item/comment-action-icon.pipe';
import { CommentBadgeColorPipe } from './comment-timeline-item/comment-badge-color.pipe';
import { CommentContentComponent } from './comment-timeline-item/comment-content/comment-content.component';
import { CommentHeaderPipe } from './comment-timeline-item/comment-header.pipe';
import { CommentTimelineItemComponent } from './comment-timeline-item/comment-timeline-item.component';
import { CreatedTimelineItemComponent } from './created-timeline-item';
import { FileActionIconPipe } from './file-timeline-item/file-action-icon.pipe';
import { FileBadgeColorPipe } from './file-timeline-item/file-badge-color.pipe';
import { FileContentComponent } from './file-timeline-item/file-content/file-content.component';
import { FileHeaderPipe } from './file-timeline-item/file-header.pipe';
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
        MessagesModule,
        FileStorageModule,
        AnkModule,
    ],
    declarations: [
        ClaimChangesetComponent,
        UnsavedClaimChangesetComponent,
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
        FileContentComponent,
        QuestionaryContentComponent,
        PartyModificationContentComponent,
        ReasonContentComponent,
        ClaimTimelineItemHeaderComponent,
        CommentHeaderPipe,
        CommentActionIconPipe,
        CommentBadgeColorPipe,
        FileHeaderPipe,
        FileBadgeColorPipe,
        FileActionIconPipe,
    ],
    exports: [ClaimChangesetComponent, UnsavedClaimChangesetComponent],
})
export class ChangesetsModule {}
