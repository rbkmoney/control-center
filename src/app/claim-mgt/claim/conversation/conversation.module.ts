import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';

import { ConversationComponent } from './conversation.component';
import { ActionIconPipe } from './action-icon.pipe';
import { TimelineModule } from '../../../shared/components/timeline';
import { SharedModule } from '../../../shared/shared.module';
import { ActionNamePipe } from './action-name.pipe';
import { MonacoEditorModule } from '../../../monaco-editor';
import { HumanizeDurationModule } from '../../../shared/humanize-duration';
import { SendCommentComponent } from './send-comment';
import { MessagesModule } from '../../../thrift-services/messages';
import { CommentComponent } from './comment/comment.component';
import { ReasonComponent } from './reason/reason.component';
import { FileContainerModule } from './file-container';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { AnkModule } from '../../../thrift-services';
import { QuestionaryDocumentModule } from '../../../questionary-document';
import { QuestionaryModule } from './questionary/questionary.module';
import { UnsavedPartyModificationsModule } from '../unsaved-party-modifications';
import { PartyModificationCreatorModule } from '../../../party-modification-creator';

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
        MatDividerModule
    ],
    declarations: [
        ConversationComponent,
        ReasonComponent,
        SendCommentComponent,
        ActionIconPipe,
        ActionNamePipe,
        CommentComponent
    ],
    exports: [ConversationComponent]
})
export class ConversationModule {}
