import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';

import { ConfirmActionDialogModule } from '@cc/components/confirm-action-dialog';

import { SharedPipesModule } from '../../shared/pipes/shared-pipes.module';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
import { ConversationModule } from './conversation/conversation.module';
import { DetailsComponent } from './details/details.component';
import { StatusChangerComponent } from './status-changer/status-changer.component';

@NgModule({
    imports: [
        ClaimRoutingModule,
        SharedPipesModule,
        CommonModule,
        MatCardModule,
        FlexModule,
        MatSelectModule,
        ConversationModule,
        MatButtonModule,
        MatDialogModule,
        MatProgressBarModule,
        ReactiveFormsModule,
        MatInputModule,
        MatListModule,
        MatBottomSheetModule,
        MatStepperModule,
        ConfirmActionDialogModule,
    ],
    declarations: [ClaimComponent, DetailsComponent, StatusChangerComponent],
    entryComponents: [StatusChangerComponent],
})
export class ClaimModule {}
