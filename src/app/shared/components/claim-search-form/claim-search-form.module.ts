import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MerchantFieldModule } from '@cc/app/shared/components/merchant-field';

import { ApiModelPipesModule } from '../../pipes';
import { ClaimSearchFormComponent } from './claim-search-form.component';
@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        ApiModelPipesModule,
        MerchantFieldModule,
    ],
    declarations: [ClaimSearchFormComponent],
    exports: [ClaimSearchFormComponent],
})
export class ClaimSearchFormModule {}
