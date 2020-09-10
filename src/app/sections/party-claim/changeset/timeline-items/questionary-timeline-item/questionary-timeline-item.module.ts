import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { TimelineModule } from '../../../../../shared/components/timeline';
import { SharedModule } from '../../../../../shared/shared.module';
import { AnkModule } from '../../../../../thrift-services/ank';
import { TimelineComponentsModule } from '../../timeline-components';
import { CommentTimelineItemModule } from '../comment-timeline-item/comment-timeline-item.module';
import { ExtractPartyModificationModule } from './extract-party-modifications/extract-party-modification.module';
import { QuestionaryContentComponent } from './questionary-content/questionary-content.component';
import { QuestionaryTimelineItemComponent } from './questionary-timeline-item.component';
import { SerialNumberPipe } from './serial-number.pipe';

@NgModule({
    declarations: [QuestionaryTimelineItemComponent, QuestionaryContentComponent, SerialNumberPipe],
    imports: [
        AnkModule,
        TimelineModule,
        CommentTimelineItemModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        FlexModule,
        CommonModule,
        MatExpansionModule,
        SharedModule,
        TimelineComponentsModule,
        ExtractPartyModificationModule,
    ],
    exports: [QuestionaryTimelineItemComponent],
})
export class QuestionaryTimelineItemModule {}
