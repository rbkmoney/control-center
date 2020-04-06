import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DomainTypedManager } from '../../../thrift-services';
import { PredicateType, TerminalInfo } from '../extract-terminal-info';

@Component({
    selector: 'cc-terminal',
    templateUrl: 'terminal.component.html',
    styleUrls: ['terminal.component.scss']
})
export class TerminalComponent {
    @Input() terminalInfo: TerminalInfo;
    @Input() partyID: string;
    @Input() shopID: string;
    @Input() providerID: number;
    @Output() terminalRemovedEvent: EventEmitter<void> = new EventEmitter();

    isLoading = false;

    constructor(private dtm: DomainTypedManager, private snackBar: MatSnackBar) {}

    removeTerminal() {
        this.isLoading = true;
        const params = {
            partyID: this.partyID,
            shopID: this.shopID,
            terminalID: this.terminalInfo.terminal.ref.id,
            providerID: this.providerID
        };
        this.dtm.removeTerminalFromShop(params).subscribe(
            () => {
                this.isLoading = false;
                this.snackBar.open('Terminal successfully removed from shop', 'OK', {
                    duration: 3000
                });
                this.terminalRemovedEvent.emit();
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

    isRemovable() {
        const { predicateType } = this.terminalInfo;
        return predicateType === PredicateType.condition || predicateType === PredicateType.any_of;
    }
}
