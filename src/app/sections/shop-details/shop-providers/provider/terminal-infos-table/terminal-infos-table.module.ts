import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { IsActivePipe } from './is-active.pipe';
import { TerminalInfosTableComponent } from './terminal-infos-table.component';

@NgModule({
    declarations: [TerminalInfosTableComponent, IsActivePipe],
    imports: [
        MatTableModule,
        FlexModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        CommonModule,
    ],
    exports: [TerminalInfosTableComponent],
})
export class TerminalInfosTableModule {}
