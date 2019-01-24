import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { PartiesComponent } from './parties.component';
import { PartiesRoutingModule } from './parties-routing.module';

@NgModule({
    imports: [
        CommonModule,
        PartiesRoutingModule,
        FlexLayoutModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ],
    declarations: [PartiesComponent]
})
export class PartiesModule {}
