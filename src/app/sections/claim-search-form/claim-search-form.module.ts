import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatSelectModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { ClaimSearchFormComponent } from './claim-search-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        SharedModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule
    ],
    declarations: [ClaimSearchFormComponent],
    exports: [ClaimSearchFormComponent]
})
export class ClaimSearchFormModule {}
