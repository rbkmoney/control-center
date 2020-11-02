import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

import { PrettyJsonModule } from '@cc/components/pretty-json';

import { FillInUnitIdComponent } from './fill-in-unit-id/fill-in-unit-id.component';
import { PartyItemNamePipe } from './party-item-name.pipe';
import { PartyModificationTargetComponent } from './party-modification-target.component';
import { TargetTableComponent } from './target-table/target-table.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatInputModule,
        MatRadioModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatCheckboxModule,
        MatTableModule,
        MatTableModule,
        MatPaginatorModule,
        PrettyJsonModule,
    ],
    declarations: [
        PartyModificationTargetComponent,
        FillInUnitIdComponent,
        TargetTableComponent,
        PartyItemNamePipe,
    ],
    exports: [PartyModificationTargetComponent],
})
export class PartyModificationTargetModule {}
