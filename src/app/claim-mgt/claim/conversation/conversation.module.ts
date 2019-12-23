import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';

import { ConversationComponent } from './conversation.component';
import { ActionColorPipe } from './action-color.pipe';
import { ActionIconPipe } from './action-icon.pipe';
import { TimelineModule } from '../../../shared/components/timeline';
import { SharedModule } from '../../../shared/shared.module';
import { ActionNamePipe } from './action-name.pipe';
import { MonacoEditorModule } from '../../../monaco-editor';
import { HumanizeDurationModule } from '../../../shared/humanize-duration';

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
        HumanizeDurationModule
    ],
    declarations: [ConversationComponent, ActionColorPipe, ActionIconPipe, ActionNamePipe],
    exports: [ConversationComponent]
})
export class ConversationModule {}
