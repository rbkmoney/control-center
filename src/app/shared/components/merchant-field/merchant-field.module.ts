import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SelectSearchFieldModule } from '@cc/components/select-search-field';

import { MerchantFieldComponent } from './merchant-field.component';

@NgModule({
    imports: [
        MatFormFieldModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatInputModule,
        CommonModule,
        SelectSearchFieldModule,
    ],
    declarations: [MerchantFieldComponent],
    exports: [MerchantFieldComponent],
    providers: [],
})
export class MerchantFieldModule {}
