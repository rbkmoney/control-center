import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';

import { PartyActionsPipe } from '@cc/app/shared/components/parties-table/party-actions.pipe';

import { PartiesTableComponent } from './parties-table.component';

@NgModule({
    exports: [PartiesTableComponent],
    declarations: [PartiesTableComponent, PartyActionsPipe],
    imports: [MatTableModule, MatMenuModule, MatButtonModule, MatIconModule, CommonModule],
})
export class PartiesTableModule {}
