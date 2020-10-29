import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HumanizeDurationModule } from '@cc/pipes/humanize-duration';

import { TimelineItemErrorComponent } from './timeline-item-error/timeline-item-error.component';
import { TimelineItemHeaderComponent } from './timeline-item-header/timeline-item-header.component';
import { TimelineItemLoadingComponent } from './timeline-item-loading/timeline-item-loading.component';

@NgModule({
    declarations: [
        TimelineItemLoadingComponent,
        TimelineItemErrorComponent,
        TimelineItemHeaderComponent,
    ],
    imports: [CommonModule, HumanizeDurationModule],
    exports: [
        TimelineItemLoadingComponent,
        TimelineItemErrorComponent,
        TimelineItemHeaderComponent,
    ],
})
export class TimelineComponentsModule {}
