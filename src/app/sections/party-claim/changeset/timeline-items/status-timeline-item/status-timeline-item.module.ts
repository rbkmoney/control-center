import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { TimelineModule } from '@cc/components/timeline';

import { TimelineComponentsModule } from '../../timeline-components';
import { CommentTimelineItemModule } from '../comment-timeline-item/comment-timeline-item.module';
import { ReasonContentComponent } from './reason-content/reason-content.component';
import { StatusActionIconPipe } from './status-action-icon.pipe';
import { StatusBadgeColorPipe } from './status-badge-color.pipe';
import { StatusHeaderPipe } from './status-header.pipe';
import { StatusTimelineItemComponent } from './status-timeline-item.component';

@NgModule({
    declarations: [
        StatusTimelineItemComponent,
        StatusHeaderPipe,
        StatusBadgeColorPipe,
        StatusActionIconPipe,
        ReasonContentComponent,
    ],
    imports: [
        TimelineModule,
        CommentTimelineItemModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        FlexModule,
        TimelineComponentsModule,
        MatCardModule,
        CommonModule,
    ],
    exports: [StatusTimelineItemComponent],
})
export class StatusTimelineItemModule {}
