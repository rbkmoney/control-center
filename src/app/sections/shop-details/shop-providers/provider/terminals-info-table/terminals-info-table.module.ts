import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';

import { IsActivePipe } from './is-active.pipe';
import { TerminalsInfoTableComponent } from './terminals-info-table.component';

@NgModule({
    declarations: [TerminalsInfoTableComponent, IsActivePipe],
    imports: [MatTableModule, FlexModule],
    exports: [TerminalsInfoTableComponent],
})
export class TerminalsInfoTableModule {}
