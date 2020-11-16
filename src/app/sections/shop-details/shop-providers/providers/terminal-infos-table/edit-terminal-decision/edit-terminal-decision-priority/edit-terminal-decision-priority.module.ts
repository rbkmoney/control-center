import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { EditTerminalDecisionPriorityComponent } from './edit-terminal-decision-priority.component';

@NgModule({
    declarations: [EditTerminalDecisionPriorityComponent],
    imports: [
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        FlexModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        CommonModule,
    ],
    entryComponents: [EditTerminalDecisionPriorityComponent],
})
export class EditTerminalDecisionPriorityModule {}
