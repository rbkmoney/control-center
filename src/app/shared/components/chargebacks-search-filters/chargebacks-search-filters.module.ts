import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ChargebacksMainSearchFiltersComponent } from './chargebacks-main-search-filters';
import { ChargebacksOtherSearchFiltersComponent } from './chargebacks-other-search-filters';
import { OtherFiltersDialogComponent } from './chargebacks-other-search-filters/other-filters-dialog';

export const RU_DATE_FORMATS = {
    parse: {
        dateInput: ['l', 'LL'],
    },
    display: {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'DD.MM.YYYY',
        dateA11yLabel: 'DD.MM.YYYY',
        monthYearA11yLabel: 'DD.MM.YYYY',
    },
};

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
    ],
    declarations: [
        ChargebacksMainSearchFiltersComponent,
        ChargebacksOtherSearchFiltersComponent,
        OtherFiltersDialogComponent,
    ],
    exports: [ChargebacksMainSearchFiltersComponent, ChargebacksOtherSearchFiltersComponent],
    providers: [{ provide: MAT_DATE_FORMATS, useValue: RU_DATE_FORMATS }],
})
export class ChargebacksSearchFiltersModule {}
