import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { SharedModule } from '../../shared/shared.module';
import { ChangesetModule } from './changeset';
import { EditUnsavedModificationModule } from './changeset/unsaved-changeset/edit-unsaved-modification/edit-unsaved-modification.module';
import { PartyClaimActionsModule } from './party-claim-actions';
import { PartyClaimRoutingModule } from './party-claim-routing.module';
import { PartyClaimTitleComponent } from './party-claim-title/party-claim-title.component';
import { PartyClaimComponent } from './party-claim.component';

@NgModule({
    imports: [
        PartyClaimRoutingModule,
        FlexModule,
        MatSelectModule,
        MatCardModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        EditUnsavedModificationModule,
        ChangesetModule,
        SharedModule,
        MatProgressSpinnerModule,
        PartyClaimActionsModule,
    ],
    declarations: [PartyClaimComponent, PartyClaimTitleComponent],
})
export class PartyClaimModule {}
