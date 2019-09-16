import { Component, Inject, OnInit } from '@angular/core';
import { EditTerminalDecisionWeightService } from './edit-terminal-decision-weight.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';

export interface EditWeightData {
    partyID: string;
    shopID: string;
    terminalID: number;
    providerID: number;
}

@Component({
    templateUrl: 'edit-terminal-decision-weight.component.html',
    providers: [EditTerminalDecisionWeightService]
})
export class EditTerminalDecisionWeightComponent implements OnInit {
    isLoading;
    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<EditTerminalDecisionWeightComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EditWeightData,
        private snackBar: MatSnackBar,
        private editWeightService: EditTerminalDecisionWeightService
    ) {}

    ngOnInit() {
        const { isLoading, form } = this.editWeightService;
        this.isLoading = isLoading;
        this.form = form;
    }

    edit() {
        this.editWeightService.edit(this.data);
    }
}
