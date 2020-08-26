import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { ExpandableRadioGroupComponent } from './expandable-radio-group.component';

const EXPORTED_DECLARATIONS = [ExpandableRadioGroupComponent];

@NgModule({
    imports: [
        FlexLayoutModule,
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        ReactiveFormsModule,
        MatIconModule,
    ],
    declarations: EXPORTED_DECLARATIONS,
    exports: EXPORTED_DECLARATIONS,
})
export class ExpandableRadioGroupModule {}
