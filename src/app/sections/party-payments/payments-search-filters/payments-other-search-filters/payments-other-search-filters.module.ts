import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { ExpandableRadioGroupModule } from '../../../../shared/components/expandable-radio-group';
import { OtherFiltersDialogModule } from './other-filters-dialog';
import { PaymentsOtherSearchFiltersComponent } from './payments-other-search-filters.component';

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
        ExpandableRadioGroupModule,
        OtherFiltersDialogModule,
    ],
    declarations: [PaymentsOtherSearchFiltersComponent],
    exports: [PaymentsOtherSearchFiltersComponent],
})
export class PaymentsOtherSearchFiltersModule {}
