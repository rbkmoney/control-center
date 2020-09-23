import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';

import { PapiModule } from '../papi/papi.module';
import {
    ModificationNameModule,
    PartyModificationCreatorLegacyModule,
} from '../party-modification-creator-legacy';
import { SharedModule } from '../shared/shared.module';
import { DamselModule } from '../thrift-services/damsel/damsel.module';
import { AcceptClaimComponent } from './accept-claim/accept-claim.component';
import { ClaimInfoDetailsComponent } from './claim-info/claim-info-details/claim-info-details.component';
import { ClaimInfoComponent } from './claim-info/claim-info.component';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
import { ClaimService } from './claim.service';
import { CloneClaimComponent } from './clone-claim/clone-claim.component';
import { DenyClaimComponent } from './deny-claim/deny-claim.component';
import { PartyModificationContainerComponent } from './party-modification-container/party-modification-container.component';
import { PartyModificationContainerService } from './party-modification-container/party-modification-container.service';
import { RemoveConfirmComponent } from './party-modification-container/remove-confirm/remove-confirm.component';
import { PartyModificationUnitsComponent } from './party-modification-units/party-modification-units.component';
import { PartyModificationsComponent } from './party-modifications/party-modifications.component';
import { PersistentContainerService } from './persistent-container.service';

@NgModule({
    imports: [
        PapiModule,
        DamselModule,
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
        MatStepperModule,
        FormsModule,
        ReactiveFormsModule,
        PartyModificationCreatorLegacyModule,
        ModificationNameModule,
    ],
    declarations: [
        ClaimComponent,
        ClaimInfoComponent,
        ClaimInfoDetailsComponent,
        PartyModificationsComponent,
        PartyModificationContainerComponent,
        CloneClaimComponent,
        AcceptClaimComponent,
        DenyClaimComponent,
        PartyModificationUnitsComponent,
        RemoveConfirmComponent,
    ],
    entryComponents: [
        CloneClaimComponent,
        AcceptClaimComponent,
        DenyClaimComponent,
        RemoveConfirmComponent,
    ],
    providers: [ClaimService, PersistentContainerService, PartyModificationContainerService],
})
export class ClaimModule {}
