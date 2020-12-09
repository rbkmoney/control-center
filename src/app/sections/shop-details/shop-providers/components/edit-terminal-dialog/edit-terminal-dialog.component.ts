import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TerminalID } from '../../../../../thrift-services/fistful/gen-model/fistful';
import { ProviderID } from '../../../../../thrift-services/fistful/gen-model/provider';
import { EditTerminalDialogResponse, TerminalActionTypes } from '../../types';

@Component({
    templateUrl: 'edit-terminal-dialog.component.html',
})
export class EditTerminalDialogComponent {
    editValueControl = new FormControl();
    terminalActionTypes = TerminalActionTypes;

    constructor(
        public dialogRef: MatDialogRef<EditTerminalDialogComponent, EditTerminalDialogResponse>,
        @Inject(MAT_DIALOG_DATA)
        public data: { type: TerminalActionTypes; terminalID: TerminalID; providerID: ProviderID }
    ) {}
}
