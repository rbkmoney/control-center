import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { PartiesSearchFiltersComponent } from './parties-search-filters.component';

@NgModule({
    imports: [FlexModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
    exports: [PartiesSearchFiltersComponent],
    declarations: [PartiesSearchFiltersComponent],
})
export class PartiesSearchFiltersModule {}
