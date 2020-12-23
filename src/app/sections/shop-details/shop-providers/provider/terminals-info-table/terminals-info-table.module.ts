import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { IsActivePipe } from './is-active.pipe';
import { TerminalsInfoTableComponent } from './terminals-info-table.component';

@NgModule({
    declarations: [TerminalsInfoTableComponent, IsActivePipe],
    imports: [MatTableModule, FlexModule, MatButtonModule, MatIconModule, MatMenuModule],
    exports: [TerminalsInfoTableComponent],
})
export class TerminalsInfoTableModule {}
