import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';

import { IsActivePipe } from './is-active.pipe';
import { TerminalInfosTableComponent } from './terminal-infos-table.component';

@NgModule({
    declarations: [TerminalInfosTableComponent, IsActivePipe],
    imports: [MatTableModule, FlexModule],
    exports: [TerminalInfosTableComponent],
})
export class TerminalInfosTableModule {}
