import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { ModificationNameModule } from '../modification-name';
import { UnitActionsNavListComponent } from './unit-actions-nav-list.component';

@NgModule({
    imports: [
        CommonModule,
        MatBottomSheetModule,
        MatDividerModule,
        MatListModule,
        ModificationNameModule,
    ],
    declarations: [UnitActionsNavListComponent],
    entryComponents: [UnitActionsNavListComponent],
})
export class UnitActionsNavListModule {}
