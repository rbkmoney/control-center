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
import { ChangesetsModule } from './changesets/changesets.module';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { PartyClaimActionsComponent } from './party-claim-actions/party-claim-actions.component';
import { PartyClaimRoutingModule } from './party-claim-routing.module';
import { PartyClaimTitleComponent } from './party-claim-title/party-claim-title.component';
import { PartyClaimComponent } from './party-claim.component';
import { SendCommentModule } from './send-comment/send-comment.module';

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
        SendCommentModule,
        FileUploaderModule,
        ChangesetsModule,
        SharedModule,
        MatProgressSpinnerModule,
    ],
    declarations: [PartyClaimComponent, PartyClaimTitleComponent, PartyClaimActionsComponent],
})
export class PartyClaimModule {}
