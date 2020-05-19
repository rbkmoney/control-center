import { CdkTableModule } from '@angular/cdk/table';
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
import { SharedModule } from '../../shared/shared.module';
import { SearchTableComponent } from './search-table/search-table.component';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { SearchClaimsService } from './search-claims.service';
import { ClaimSearchFormModule } from '../claim-search-form';
import { ClaimMailPipePipe } from './search-table/claim-mail-pipe.pipe';

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
        ClaimSearchFormModule
    ],
    declarations: [SearchClaimsComponent, SearchTableComponent, ClaimMailPipePipe],
    providers: [SearchClaimsService, ClaimManagementService]
})
export class SearchClaimsModule {}
