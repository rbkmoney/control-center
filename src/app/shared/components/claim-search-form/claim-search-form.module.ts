import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ClaimSearchFormComponent } from '@cc/app/shared/components';
import { SharedPipesModule } from '@cc/app/shared/pipes';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        SharedPipesModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
    declarations: [ClaimSearchFormComponent],
    exports: [ClaimSearchFormComponent],
})
export class ClaimSearchFormModule {}
