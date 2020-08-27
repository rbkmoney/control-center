import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { TimelineModule } from '../../../../../shared/components/timeline';
import { SharedModule } from '../../../../../shared/shared.module';
import { TimelineComponentsModule } from '../../timeline-components/timeline-components.module';
import { CommentTimelineItemModule } from '../comment-timeline-item/comment-timeline-item.module';
import { PartyModificationContentComponent } from './party-modification-content/party-modification-content.component';
import { PartyModificationTimelineItemComponent } from './party-modification-timeline-item.component';

@NgModule({
    declarations: [PartyModificationTimelineItemComponent, PartyModificationContentComponent],
    imports: [
        TimelineModule,
        CommentTimelineItemModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        FlexModule,
        MatExpansionModule,
        SharedModule,
        TimelineComponentsModule,
        CommonModule,
    ],
    exports: [PartyModificationTimelineItemComponent],
})
export class PartyModificationTimelineItemModule {}
