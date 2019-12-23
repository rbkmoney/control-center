import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { TimelineComponent } from './timeline.component';
import { TimelineItemComponent } from './timeline-item';
import { TimelineItemTitleComponent } from './timeline-item/timeline-item-title';
import { TimelineItemBadgeComponent } from './timeline-item/timeline-item-badge';
import { TimelineItemContentComponent } from './timeline-item/timeline-item-content';

const EXPORTED_DECLARATIONS = [
    TimelineComponent,
    TimelineItemComponent,
    TimelineItemTitleComponent,
    TimelineItemBadgeComponent,
    TimelineItemContentComponent
];

@NgModule({
    imports: [FlexLayoutModule, CommonModule],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS
})
export class TimelineModule {}
