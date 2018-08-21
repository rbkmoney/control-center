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
    MatRadioModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { PapiModule } from '../papi/papi.module';
import { DomainModule } from '../domain/domain.module';
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
import { CreateBusinessScheduleRefComponent } from './create-change/create-business-schedule-ref/create-business-schedule-ref.component';
import {
    CreateServiceAcceptanceActPreferencesComponent
} from './create-change/create-service-acceptance-act-preferences/create-service-acceptance-act-preferences.component';
import { CreateTerminalObjectComponent } from './create-change/create-terminal-object/create-terminal-object.component';
import { SharedModule } from '../shared/shared.module';
import { ContainerNamePipe } from './container-name.pipe';

@NgModule({
    imports: [
        PapiModule,
        DomainModule,
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
        MatRadioModule,
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
        CreateBusinessScheduleRefComponent,
        CreateServiceAcceptanceActPreferencesComponent,
        AcceptClaimComponent,
        DenyClaimComponent,
        CreateTerminalObjectComponent,
        ContainerNamePipe
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
