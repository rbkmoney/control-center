import { OtherFiltersDialogComponent } from './other-filters-dialog';
import { SearchFormComponent } from './search-form.component';
import { FlexModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { ExpandableRadioGroupModule } from '../../../shared/components/expandable-radio-group';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule,
        MatInputModule,
        FlexModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatDividerModule,
        MatRadioModule,
        MomentDateModule,
        MatButtonModule,
        MatBadgeModule,
        ExpandableRadioGroupModule,
        ExpandableRadioGroupModule,
    ],
    declarations: [SearchFormComponent, OtherFiltersDialogComponent],
    exports: [SearchFormComponent],
    entryComponents: [OtherFiltersDialogComponent],
})
export class SearchFormModule {}
