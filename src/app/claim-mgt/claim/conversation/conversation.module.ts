import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatExpansionModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

import { ConversationComponent } from './conversation.component';
import { ActionIconPipe } from './action-icon.pipe';
import { TimelineModule } from '../../../shared/components/timeline';
import { SharedModule } from '../../../shared/shared.module';
import { ActionNamePipe } from './action-name.pipe';
import { MonacoEditorModule } from '../../../monaco-editor';
import { HumanizeDurationModule } from '../../../shared/humanize-duration';
import { FileContainerModule } from './file-container';
import { FileUploaderModule } from './file-uploader/file-uploader.module';

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
        SharedModule,
        MatExpansionModule,
        MonacoEditorModule,
        HumanizeDurationModule,
        MatSelectModule,
        FileContainerModule,
        FileUploaderModule
    ],
    declarations: [ConversationComponent, ActionIconPipe, ActionNamePipe],
    exports: [ConversationComponent]
})
export class ConversationModule {}
