import { Component, Inject, OnInit } from '@angular/core';
import { EditTerminalDecisionPriorityService } from './edit-terminal-decision-priority.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';

export interface EditPriorityData {
    partyID: string;
    shopID: string;
    terminalID: number;
    providerID: number;
}

@Component({
    templateUrl: 'edit-terminal-decision-priority.component.html',
    providers: [EditTerminalDecisionPriorityService]
})
export class EditTerminalDecisionPriorityComponent implements OnInit {
    isLoading;
    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<EditTerminalDecisionPriorityComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EditPriorityData,
        private snackBar: MatSnackBar,
        private editPriorityService: EditTerminalDecisionPriorityService
    ) {}

    ngOnInit() {
        const { isLoading, form } = this.editPriorityService;
        this.isLoading = isLoading;
        this.form = form;
    }

    edit() {
        this.editPriorityService.edit(this.data);
    }
}
