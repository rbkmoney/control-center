import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { MonacoEditorModule } from '../../../monaco-editor';
import { PartyModificationCreatorModule } from '../../../party-modification-creator';
import { QuestionaryDocumentModule } from '../../../questionary-document';
import { TimelineModule } from '../../../shared/components/timeline';
import { HumanizeDurationModule } from '../../../shared/humanize-duration';
import { SharedModule } from '../../../shared/shared.module';
import { AnkModule } from '../../../thrift-services';
import { MessagesModule } from '../../../thrift-services/messages';
import { UnsavedPartyModificationsModule } from '../unsaved-party-modifications';
import { ActionIconPipe } from './action-icon.pipe';
import { ActionNamePipe } from './action-name.pipe';
import { CommentComponent } from './comment/comment.component';
import { ConversationComponent } from './conversation.component';
import { ExtractPartyModificationModule } from './extract-party-modifications/extract-party-modification.module';
import { FileContainerModule } from './file-container';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { QuestionaryModule } from './questionary/questionary.module';
import { ReasonComponent } from './reason/reason.component';
import { SendCommentComponent } from './send-comment';

@NgModule({
    imports: [
        LayoutModule,
        MatButtonModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule,
        TimelineModule,
        MatIconModule,
        SharedModule,
        CommonModule,
        ReactiveFormsModule,
        MatExpansionModule,
        MonacoEditorModule,
        HumanizeDurationModule,
        MessagesModule,
        MatCardModule,
        HumanizeDurationModule,
        MatSelectModule,
        FileContainerModule,
        FileUploaderModule,
        AnkModule,
        QuestionaryDocumentModule,
        MatListModule,
        QuestionaryModule,
        UnsavedPartyModificationsModule,
        PartyModificationCreatorModule,
        MatDividerModule,
        ExtractPartyModificationModule,
        MatMenuModule,
    ],
    declarations: [
        ConversationComponent,
        ReasonComponent,
        SendCommentComponent,
        ActionIconPipe,
        ActionNamePipe,
        CommentComponent,
    ],
    exports: [ConversationComponent],
})
export class ConversationModule {}
