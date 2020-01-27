import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';

import { ClaimComponent } from './claim.component';
import { ClaimRoutingModule } from './claim-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ClaimManagementService } from '../../thrift-services/damsel/claim-management.service';
import { DetailsComponent } from './details/details.component';
import { ConversationModule } from './conversation/conversation.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        ClaimRoutingModule,
        SharedModule,
        CommonModule,
        MatCardModule,
        FlexModule,
        ConversationModule,
        MatSelectModule
        ConversationModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressBarModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule
    ],
    declarations: [ClaimComponent, DetailsComponent, StatusChangerComponent],
    entryComponents: [StatusChangerComponent],
    providers: [ClaimManagementService]
})
export class ClaimModule {}
