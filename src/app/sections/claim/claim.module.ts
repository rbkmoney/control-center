import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
import { FileUploaderModule } from './file-uploader/file-uploader.module';
import { SendCommentModule } from './send-comment/send-comment.module';

@NgModule({
    imports: [
        ClaimRoutingModule,
        FlexModule,
        MatSelectModule,
        MatCardModule,
        FileUploaderModule,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
        MatInputModule,
        SendCommentModule,
    ],
    declarations: [ClaimComponent],
})
export class ClaimModule {}
