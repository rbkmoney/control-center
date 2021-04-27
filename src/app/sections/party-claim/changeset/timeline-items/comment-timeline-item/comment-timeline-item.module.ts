import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TimelineModule } from '@cc/components/timeline';

import { MessagesModule } from '../../../../../thrift-services/messages';
import { TimelineComponentsModule } from '../../timeline-components';
import { CommentActionIconPipe } from './comment-action-icon.pipe';
import { CommentBadgeColorPipe } from './comment-badge-color.pipe';
import { CommentContentComponent } from './comment-content/comment-content.component';
import { CommentHeaderPipe } from './comment-header.pipe';
import { CommentTimelineItemComponent } from './comment-timeline-item.component';

@NgModule({
    imports: [
        MessagesModule,
        TimelineModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        FlexModule,
        CommonModule,
        MatCardModule,
        TimelineComponentsModule,
    ],
    declarations: [
        CommentTimelineItemComponent,
        CommentHeaderPipe,
        CommentBadgeColorPipe,
        CommentActionIconPipe,
        CommentContentComponent,
    ],
    exports: [CommentTimelineItemComponent],
})
export class CommentTimelineItemModule {}
