import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { ChangesetsFilterComponent } from './changesets-filter.component';

@NgModule({
    declarations: [ChangesetsFilterComponent],
    imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule, FlexModule],
    exports: [ChangesetsFilterComponent],
})
export class ChangesetsFilterModule {}
