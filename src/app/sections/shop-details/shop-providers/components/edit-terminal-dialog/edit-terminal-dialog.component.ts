import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EditTerminalDecisionPropertyForShopService } from '../../../../../thrift-services/damsel';
import { PartyID, ShopID } from '../../../../../thrift-services/damsel/gen-model/domain';
import { TerminalID } from '../../../../../thrift-services/fistful/gen-model/fistful';
import { EditTerminalDialogResponse, TerminalActionTypes } from '../../types';

@Component({
    templateUrl: 'edit-terminal-dialog.component.html',
    providers: [EditTerminalDecisionPropertyForShopService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditTerminalDialogComponent {
    editValueControl = new FormControl('', [Validators.required]);
    terminalActionTypes = TerminalActionTypes;
    inProgress$ = this.editTerminalDecisionPropertyForShopService.inProgress$;

    constructor(
        private editTerminalDecisionPropertyForShopService: EditTerminalDecisionPropertyForShopService,
        public dialogRef: MatDialogRef<EditTerminalDialogComponent, EditTerminalDialogResponse>,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            type: TerminalActionTypes;
            terminalID: TerminalID;
            providerID: number;
            shopID: ShopID;
            partyID: PartyID;
        }
    ) {
        this.editTerminalDecisionPropertyForShopService.edited$.subscribe(() =>
            this.dialogRef.close('edited')
        );
        this.editTerminalDecisionPropertyForShopService.inProgress$.subscribe((progress) => {
            if (progress) {
                this.editValueControl.disable();
            } else {
                this.editValueControl.enable();
            }
        });
    }

    save() {
        const editParams = {
            providerID: this.data.providerID,
            terminalID: this.data.terminalID,
            partyID: this.data.partyID,
            shopID: this.data.shopID,
            value: this.editValueControl.value,
        };
        switch (this.data.type) {
            case TerminalActionTypes.editWeight:
                this.editTerminalDecisionPropertyForShopService.editTerminalDecisionPropertyForShop(
                    {
                        ...editParams,
                        property: 'weight',
                    }
                );
                break;
            case TerminalActionTypes.editPriority:
                this.editTerminalDecisionPropertyForShopService.editTerminalDecisionPropertyForShop(
                    {
                        ...editParams,
                        property: 'priority',
                    }
                );
                break;
            default:
                console.error('Wrong terminal action!');
        }
    }
}
