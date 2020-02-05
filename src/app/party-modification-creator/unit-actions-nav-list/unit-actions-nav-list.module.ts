import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBottomSheetModule, MatDividerModule, MatListModule } from '@angular/material';

import { UnitActionsNavListComponent } from './unit-actions-nav-list.component';
import { ModificationNameModule } from '../modification-name';

@NgModule({
    imports: [
        CommonModule,
        MatBottomSheetModule,
        MatDividerModule,
        MatListModule,
        ModificationNameModule
    ],
    declarations: [UnitActionsNavListComponent],
    entryComponents: [UnitActionsNavListComponent]
})
export class UnitActionsNavListModule {}
