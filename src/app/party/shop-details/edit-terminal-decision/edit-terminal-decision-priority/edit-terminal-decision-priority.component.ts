import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
export class EditTerminalDecisionPriorityComponent implements OnInit {
    isLoading$;
    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<EditTerminalDecisionPriorityComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EditPriorityData,
        private editPriorityService: EditTerminalDecisionPriorityService
    ) {}

    ngOnInit() {
        const { isLoading$, form } = this.editPriorityService;
        this.isLoading$ = isLoading$;
        this.form = form;
        this.editPriorityService.terminalChanged.subscribe(() => {
            this.dialogRef.close(true);
        });
    }

    edit() {
        this.editPriorityService.edit(this.data);
    }
}
