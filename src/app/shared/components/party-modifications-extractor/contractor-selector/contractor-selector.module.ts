import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { PrettyJsonModule } from '@cc/components/pretty-json';

import { ContractorSelectorComponent } from './contractor-selector.component';
import { ContractorsTableComponent } from './contractors-table/contractors-table.component';
import { SelectorTypePipe } from './selector-type.pipe';

@NgModule({
    imports: [
        FlexModule,
        MatRadioModule,
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        PrettyJsonModule,
    ],
    exports: [ContractorSelectorComponent],
    declarations: [ContractorSelectorComponent, SelectorTypePipe, ContractorsTableComponent],
})
export class ContractorSelectorModule {}
