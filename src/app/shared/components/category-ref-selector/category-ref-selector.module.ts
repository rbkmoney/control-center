import { NgModule } from '@angular/core';
import { CategoryRefSelectorComponent } from './category-ref-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PapiModule } from '../../../papi/papi.module';

@NgModule({
    declarations: [CategoryRefSelectorComponent],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        FlexLayoutModule,
        MatSelectModule,
        CommonModule,
        MatProgressBarModule,
        MatSnackBarModule,
        PapiModule
    ],
    exports: [CategoryRefSelectorComponent]
})
export class CategoryRefSelectorModule {

}