import { NgModule } from '@angular/core';

import { FirstLetterToUppercasePipe } from './first-letter-to-uppercase.pipe';
import { StatusComponent } from './status.component';
import { ToColorPipe } from './to-color.pipe';
import { ToStatusPipe } from './to-status.pipe';

@NgModule({
    declarations: [StatusComponent, FirstLetterToUppercasePipe, ToColorPipe, ToStatusPipe],
    exports: [StatusComponent, FirstLetterToUppercasePipe, ToColorPipe, ToStatusPipe],
})
export class StatusModule {}
