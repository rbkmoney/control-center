import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';

import { IsActivePipe } from './is-active.pipe';
import { TerminalInfoTableComponent } from './terminal-info-table.component';

@NgModule({
    declarations: [TerminalInfoTableComponent, IsActivePipe],
    imports: [MatTableModule, FlexModule],
    exports: [TerminalInfoTableComponent],
})
export class TerminalInfoTableModule {}
