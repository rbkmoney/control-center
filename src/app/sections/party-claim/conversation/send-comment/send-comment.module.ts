import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { MessagesModule } from '../../../../thrift-services/messages';
import { SendCommentComponent } from './send-comment.component';
import { SendCommentService } from './send-comment.service';

@NgModule({
    declarations: [SendCommentComponent],
    providers: [SendCommentService],
    imports: [
        MessagesModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FlexModule,
        MatInputModule,
        CommonModule,
    ],
    exports: [SendCommentComponent],
})
export class SendCommentModule {}
