import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { TimelineModule } from '../../../../shared/components/timeline';
import { TimelineComponentsModule } from '../timeline-components/timeline-components.module';
import { CreatedTimelineItemComponent } from './created-timeline-item.component';

@NgModule({
    declarations: [CreatedTimelineItemComponent],
    imports: [TimelineModule, TimelineComponentsModule, MatIconModule],
    exports: [CreatedTimelineItemComponent],
})
export class CreatedTimelineItemModule {}
