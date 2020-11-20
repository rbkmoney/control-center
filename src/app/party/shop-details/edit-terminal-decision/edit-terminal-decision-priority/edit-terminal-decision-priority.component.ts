import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PartyID, ShopID } from '../../../../thrift-services/damsel/gen-model/domain';
import { TerminalID } from '../../../../thrift-services/fistful/gen-model/fistful';
import { ProviderID } from '../../../../thrift-services/fistful/gen-model/provider';
import { EditTerminalDecisionPriorityService } from './edit-terminal-decision-priority.service';

export interface EditPriorityData {
    partyID: PartyID;
    shopID: ShopID;
    terminalID: TerminalID;
    providerID: ProviderID;
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
