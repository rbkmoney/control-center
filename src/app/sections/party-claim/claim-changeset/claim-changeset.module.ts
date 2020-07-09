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
import { ActionIconPipe } from './action-icon.pipe';
import { ActionNamePipe } from './action-name.pipe';
import { ClaimChangesetComponent } from './claim-changeset.component';
import { CommentTimelineItemComponent, DeletedCommentTimelineItemComponent } from './comment-items';
import { CreatedTimelineItemComponent } from './created-timeline-item';
import { DeletedFileTimelineItemComponent, FileTimelineItemComponent } from './files-items';
import { PartyModificationTimelineItemComponent } from './party-modification-timeline-item';
import {
    AuthorityConfirmingDocumentTitlePipe,
    BankAccountInfoComponent,
    BeneficialOwnerInfoComponent,
    ContactInfoComponent,
    EmptyDefaultPipe,
    IdentityDocumentInfoComponent,
    IndividualEntityInfoComponent,
    LegalOwnerInfoComponent,
    OrganizationInfoComponent,
    PdlInfoComponent,
    PrivateEntityInfoComponent,
    QuestionaryTimelineItemComponent,
    SerialNumberPipe,
    ShopInfoComponent,
    YesNoPipe,
} from './questionary-timeline-item';
import {
    StatusAcceptedTimelineItemComponent,
    StatusDeniedTimelineItemComponent,
    StatusPendingTimelineItemComponent,
    StatusReviewTimelineItemComponent,
    StatusRevokedTimelineItemComponent,
} from './status-items';

@NgModule({
    imports: [
        FlexModule,
        MatFormFieldModule,
        MatSelectModule,
        TimelineModule,
        CommonModule,
        HumanizeDurationModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatCardModule,
        MatExpansionModule,
        SharedModule,
        DetailsItemModule,
        MatDividerModule,
    ],
    declarations: [
        ClaimChangesetComponent,
        ActionIconPipe,
        ActionNamePipe,
        CreatedTimelineItemComponent,
        FileTimelineItemComponent,
        CommentTimelineItemComponent,
        DeletedFileTimelineItemComponent,
        DeletedCommentTimelineItemComponent,
        StatusAcceptedTimelineItemComponent,
        StatusDeniedTimelineItemComponent,
        StatusPendingTimelineItemComponent,
        StatusReviewTimelineItemComponent,
        StatusRevokedTimelineItemComponent,
        QuestionaryTimelineItemComponent,
        OrganizationInfoComponent,
        LegalOwnerInfoComponent,
        IndividualEntityInfoComponent,
        ShopInfoComponent,
        BankAccountInfoComponent,
        ContactInfoComponent,
        BeneficialOwnerInfoComponent,
        SerialNumberPipe,
        YesNoPipe,
        EmptyDefaultPipe,
        AuthorityConfirmingDocumentTitlePipe,
        PdlInfoComponent,
        IdentityDocumentInfoComponent,
        PrivateEntityInfoComponent,
        PartyModificationTimelineItemComponent,
    ],
    exports: [ClaimChangesetComponent],
})
export class ClaimChangesetModule {}
