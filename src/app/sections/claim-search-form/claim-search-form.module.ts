import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { SharedModule } from '../../shared/shared.module';
import { ClaimSearchFormComponent } from './claim-search-form.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        SharedModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
    ],
    declarations: [ClaimSearchFormComponent],
    exports: [ClaimSearchFormComponent],
})
export class ClaimSearchFormModule {}
