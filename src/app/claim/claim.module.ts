import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { BackendModule } from '../backend/backend.module';
import { SharedModule } from '../shared/shared.module';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
import { ClaimInfoComponent } from './claim-info/claim-info.component';
import { ClaimInfoDetailsComponent } from './claim-info/claim-info-details/claim-info-details.component';
import { PartyModificationsComponent } from './party-modifications/party-modifications.component';
import { PartyModificationContainerComponent } from './party-modification-container/party-modification-container.component';
import { ClaimActionsComponent } from './claim-actions/claim-actions.component';
import { CreateChangeComponent } from './create-change/create-change.component';
import { CreateLegalAgreementComponent } from './create-change/create-legal-agreement/create-legal-agreement.component';
import { CreateCategoryRefComponent } from './create-change/create-category-ref/create-category-ref.component';
import { ClaimService } from './claim.service';
import { CreateCurrencyRefComponent } from './create-change/create-currency-ref/create-currency-ref.component';
import { CreateContractTemplateComponent } from './create-change/create-contract-template/create-contract-template.component';
import { AcceptClaimComponent } from './accept-claim/accept-claim.component';
import { DenyClaimComponent } from './deny-claim/deny-claim.component';

@NgModule({
    imports: [
        BackendModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        ClaimRoutingModule,
        FlexLayoutModule,
        MatCardModule,
        MatButtonModule,
        MatTabsModule,
        MatBottomSheetModule,
        MatListModule,
        MatIconModule,
        MatDialogModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDividerModule,
        MatSelectModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        PrettyJsonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        ClaimComponent,
        ClaimInfoComponent,
        ClaimInfoDetailsComponent,
        PartyModificationsComponent,
        PartyModificationContainerComponent,
        ClaimActionsComponent,
        CreateChangeComponent,
        CreateLegalAgreementComponent,
        CreateCategoryRefComponent,
        CreateCurrencyRefComponent,
        CreateContractTemplateComponent,
        AcceptClaimComponent,
        DenyClaimComponent
    ],
    entryComponents: [
        ClaimActionsComponent,
        CreateChangeComponent,
        AcceptClaimComponent,
        DenyClaimComponent
    ],
    providers: [
        ClaimService
    ]
})
export class ClaimModule {
}
