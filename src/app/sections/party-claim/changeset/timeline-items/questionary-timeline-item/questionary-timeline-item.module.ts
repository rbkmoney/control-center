import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { PartyModificationsExtractorModule } from '@cc/app/shared/components';
import { PrettyJsonModule } from '@cc/components/pretty-json';
import { TimelineModule } from '@cc/components/timeline';

import { AnkModule } from '../../../../../thrift-services/ank';
import { TimelineComponentsModule } from '../../timeline-components';
import { CommentTimelineItemModule } from '../comment-timeline-item/comment-timeline-item.module';
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
        TimelineComponentsModule,
        PartyModificationsExtractorModule,
        PrettyJsonModule,
    ],
    exports: [QuestionaryTimelineItemComponent],
})
export class QuestionaryTimelineItemModule {}
