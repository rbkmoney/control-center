import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

import { EmptySearchResultModule } from '@cc/components/empty-search-result';

import { SharedModule } from '../../shared/shared.module';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { ClaimSearchFormModule } from '../claim-search-form';
import { SearchClaimsComponentRouting } from './search-claims-routing.module';
import { SearchClaimsComponent } from './search-claims.component';
import { SearchClaimsService } from './search-claims.service';
import { ClaimMailPipePipe } from './search-table/claim-mail-pipe.pipe';
import { SearchTableComponent } from './search-table/search-table.component';

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
        MatExpansionModule,
        ClaimSearchFormModule,
        EmptySearchResultModule,
    ],
    declarations: [SearchClaimsComponent, SearchTableComponent, ClaimMailPipePipe],
    providers: [SearchClaimsService, ClaimManagementService],
})
export class SearchClaimsModule {}
