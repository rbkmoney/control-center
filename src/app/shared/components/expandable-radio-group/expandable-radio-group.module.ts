import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ExpandableRadioGroupComponent } from './expandable-radio-group.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';

const EXPORTED_DECLARATIONS = [
    ExpandableRadioGroupComponent,
];

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
        MatFormFieldModule,
        MatRadioModule,
        ReactiveFormsModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class ExpandableRadioGroupModule {}
