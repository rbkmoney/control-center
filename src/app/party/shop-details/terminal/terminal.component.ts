import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { TerminalObject } from '../../../gen-damsel/domain';
import { DomainTypedManager } from '../../../thrift';

@Component({
    selector: 'cc-terminal',
    templateUrl: 'terminal.component.html'
})
export class TerminalComponent {
    @Input() terminal: TerminalObject;
    @Input() partyID: string;
    @Input() shopID: string;
    @Input() providerID: number;

    isLoading = false;

    constructor(private dtm: DomainTypedManager, private snackBar: MatSnackBar) {}

    removeTerminal() {
        this.isLoading = true;
        const params = {
            partyID: this.partyID,
            shopID: this.shopID,
            terminalID: this.terminal.ref.id,
            providerID: this.providerID
        };
        this.dtm.removeTerminalFromShop(params).subscribe(
            () => {
                this.isLoading = false;
                this.snackBar.open('Terminal successfully removed from shop', 'OK', {
                    duration: 3000
                });
            },
            e => {
                this.isLoading = false;
                this.snackBar.open(
                    'An error occurred while while removing terminal from shop',
                    'OK'
                );
                console.error(e);
            }
        );
    }
}
