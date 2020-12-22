import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DomainCacheService } from '../../../../thrift-services/damsel/domain-cache.service';
import { PartyID, ShopID } from '../../../../thrift-services/damsel/gen-model/domain';
import { AddTerminalDialogResponse } from '../types/add-terminal-dialog-response';
import { AddTerminalDecisionService } from './services/add-terminal-decision';

@Component({
    templateUrl: 'add-terminal-dialog.component.html',
    providers: [AddTerminalDecisionService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTerminalDialogComponent {
    providers$ = this.addTerminalDecisionService.getProviders(this.data.categoryID);
    terminals$ = this.domainCacheService.getObjects('terminal');
    inProgress$ = this.addTerminalDecisionService.inProgress$;

    providerForm = this.addTerminalDecisionService.providerForm;
    terminalForm = this.addTerminalDecisionService.terminalForm;

    constructor(
        private domainCacheService: DomainCacheService,
        private addTerminalDecisionService: AddTerminalDecisionService,
        public dialogRef: MatDialogRef<AddTerminalDialogComponent, AddTerminalDialogResponse>,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            shopID: ShopID;
            partyID: PartyID;
            categoryID: number;
        }
    ) {
        this.addTerminalDecisionService.terminalAdded$.subscribe(() => {
            return this.dialogRef.close('added');
        });
    }

    providerIDSelected(id: number) {
        this.providerForm.setValue({ id });
    }

    terminalIDSelected(id: number) {
        this.terminalForm.setValue({ id });
    }

    add() {
        this.addTerminalDecisionService.add({
            partyID: this.data.partyID,
            shopID: this.data.shopID,
        });
    }
}
