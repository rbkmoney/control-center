import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';

import { TimelineModule } from '../../../shared/components/timeline';
import { HumanizeDurationModule } from '../../../shared/humanize-duration';
import { SharedModule } from '../../../shared/shared.module';
import { ActionIconPipe } from './action-icon.pipe';
import { ActionNamePipe } from './action-name.pipe';
import { BadgeColorPipe } from './badge-color.pipe';
import { ConversationComponent } from './conversation.component';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { SendCommentModule } from './send-comment/send-comment.module';

@NgModule({
    imports: [
        SendCommentModule,
        FileUploaderModule,
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
    ],
    declarations: [ConversationComponent, ActionIconPipe, ActionNamePipe, BadgeColorPipe],
    exports: [ConversationComponent],
})
export class ConversationModule {}
