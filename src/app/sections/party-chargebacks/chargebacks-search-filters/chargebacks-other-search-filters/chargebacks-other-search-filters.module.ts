import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ChargebacksOtherSearchFiltersComponent } from './chargebacks-other-search-filters.component';
import { OtherFiltersDialogModule } from './other-filters-dialog';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatBadgeModule,
        MatDialogModule,
        MatDividerModule,
        FlexLayoutModule,
        MatSelectModule,
        MatDialogModule,
        FormsModule,
        MatOptionModule,
        OtherFiltersDialogModule,
    ],
    declarations: [ChargebacksOtherSearchFiltersComponent],
    exports: [ChargebacksOtherSearchFiltersComponent],
})
export class ChargebacksOtherSearchFiltersModule {}
