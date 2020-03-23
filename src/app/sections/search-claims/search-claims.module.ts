import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule
} from '@angular/material';

import { SearchClaimsComponent } from './search-claims.component';
import { SearchClaimsComponentRouting } from './search-claims-routing.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SearchClaimsComponentRouting,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTableModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        SharedModule,
        MatExpansionModule
    ],
    declarations: [SearchClaimsComponent, SearchFormComponent]
})
export class SearchClaimsModule {}
