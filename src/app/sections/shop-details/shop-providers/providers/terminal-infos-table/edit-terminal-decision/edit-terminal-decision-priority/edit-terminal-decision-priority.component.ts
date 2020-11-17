import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EditTerminalDecisionPriorityService } from './edit-terminal-decision-priority.service';

export interface EditPriorityData {
    partyID: string;
    shopID: string;
    terminalID: number;
    providerID: number;
}

@Component({
    templateUrl: 'edit-terminal-decision-priority.component.html',
    providers: [EditTerminalDecisionPriorityService],
})
export class EditTerminalDecisionPriorityComponent {
    inProgress$ = this.editPriorityService.inProgress$;
    form = this.editPriorityService.form;

    constructor(
        private dialogRef: MatDialogRef<EditTerminalDecisionPriorityComponent>,
        private editPriorityService: EditTerminalDecisionPriorityService,
        @Inject(MAT_DIALOG_DATA) public data: EditPriorityData
    ) {
        this.editPriorityService.terminalEdited$.subscribe(() => this.dialogRef.close(true));
    }

    edit() {
        this.editPriorityService.editTerminal(this.data);
    }
}
