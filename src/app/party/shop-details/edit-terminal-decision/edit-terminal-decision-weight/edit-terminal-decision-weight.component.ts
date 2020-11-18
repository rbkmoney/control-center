import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PartyID, ShopID } from '../../../../thrift-services/damsel/gen-model/domain';
import { TerminalID } from '../../../../thrift-services/fistful/gen-model/fistful';
import { ProviderID } from '../../../../thrift-services/fistful/gen-model/provider';
import { EditTerminalDecisionWeightService } from './edit-terminal-decision-weight.service';

export interface EditWeightData {
    partyID: PartyID;
    shopID: ShopID;
    terminalID: TerminalID;
    providerID: ProviderID;
}

@Component({
    templateUrl: 'edit-terminal-decision-weight.component.html',
    providers: [EditTerminalDecisionWeightService],
})
export class EditTerminalDecisionWeightComponent implements OnInit {
    isLoading$;
    form: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<EditTerminalDecisionWeightComponent>,
        @Inject(MAT_DIALOG_DATA) public data: EditWeightData,
        private editWeightService: EditTerminalDecisionWeightService
    ) {}

    ngOnInit() {
        const { isLoading$, form } = this.editWeightService;
        this.isLoading$ = isLoading$;
        this.form = form;
        this.editWeightService.terminalChanged.subscribe(() => {
            this.dialogRef.close(true);
        });
    }

    edit() {
        this.editWeightService.edit(this.data);
    }
}
