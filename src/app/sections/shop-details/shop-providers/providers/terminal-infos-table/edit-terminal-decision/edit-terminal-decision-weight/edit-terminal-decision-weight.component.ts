import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EditTerminalDecisionWeightService } from './edit-terminal-decision-weight.service';

export interface EditWeightData {
    partyID: string;
    shopID: string;
    terminalID: number;
    providerID: number;
}

@Component({
    templateUrl: 'edit-terminal-decision-weight.component.html',
    providers: [EditTerminalDecisionWeightService],
})
export class EditTerminalDecisionWeightComponent {
    inProgress$ = this.editWeightService.inProgress$;
    form = this.editWeightService.form;

    constructor(
        private dialogRef: MatDialogRef<EditTerminalDecisionWeightComponent>,
        private editWeightService: EditTerminalDecisionWeightService,
        @Inject(MAT_DIALOG_DATA) public data: EditWeightData
    ) {
        this.editWeightService.terminalEdited$.subscribe(() => this.dialogRef.close(true));
    }

    edit() {
        this.editWeightService.editTerminal(this.data);
    }
}
