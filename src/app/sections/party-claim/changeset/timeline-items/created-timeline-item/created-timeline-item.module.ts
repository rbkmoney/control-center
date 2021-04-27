import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TimelineModule } from '@cc/components/timeline';

import { TimelineComponentsModule } from '../../timeline-components';
import { CreatedTimelineItemComponent } from './created-timeline-item.component';

@NgModule({
    declarations: [CreatedTimelineItemComponent],
    imports: [TimelineModule, TimelineComponentsModule, MatIconModule],
    exports: [CreatedTimelineItemComponent],
})
export class CreatedTimelineItemModule {}
