import { NgModule } from '@angular/core';

import { HumanizeDurationService } from './humanize-duration.service';
import { HumanizedDurationPipe } from './humanized-duration.pipe';

@NgModule({
    declarations: [HumanizedDurationPipe],
    providers: [HumanizeDurationService],
    exports: [HumanizedDurationPipe],
})
export class HumanizeDurationModule {}
