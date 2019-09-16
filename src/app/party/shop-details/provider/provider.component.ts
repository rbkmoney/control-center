import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { filter } from 'rxjs/operators';

import { DomainTypedManager } from '../../../thrift';
import { ProviderInfo } from '../shop-details.service';
import { PredicateType } from '../extract-terminal-info';
import { EditTerminalDecisionPriorityComponent } from '../edit-terminal-decision/edit-terminal-decision-priority/edit-terminal-decision-priority.component';
import { EditTerminalDecisionWeightComponent } from '../edit-terminal-decision/edit-terminal-decision-weight/edit-terminal-decision-weight.component';

@Component({
    selector: 'cc-provider',
    templateUrl: 'provider.component.html',
    styleUrls: ['provider.component.scss']
})
export class ProviderComponent {
    @Input() providerInfo: ProviderInfo[];
    @Input() partyID: string;
    @Input() shopID: string;
    @Output() terminalChanged: EventEmitter<void> = new EventEmitter();

    columns = ['name', 'description', 'type', 'priority', 'weight', 'status', 'actions'];
    isLoading = false;

    constructor(
        private dtm: DomainTypedManager,
        private snackBar: MatSnackBar,
        private dialog: MatDialog
    ) {}

    isRemovable(predicateType: PredicateType) {
        return (
            (predicateType === PredicateType.condition || predicateType === PredicateType.any_of) &&
            !this.isLoading
        );
    }

    removeTerminal(terminalID: number, providerID: number) {
        this.isLoading = true;
        const params = this.getModalData(terminalID, providerID);
        this.dtm.removeTerminalFromShop(params).subscribe(
            () => {
                this.isLoading = false;
                this.snackBar.open('Terminal successfully removed from shop', 'OK', {
                    duration: 3000
                });
                this.terminalChanged.emit();
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

    editPriority(terminalID: number, providerID: number) {
        const config = {
            data: this.getModalData(terminalID, providerID),
            width: '300px',
            disableClose: true
        };
        const dialog = this.dialog.open(EditTerminalDecisionPriorityComponent, config);
        dialog
            .afterClosed()
            .pipe(filter(result => result))
            .subscribe(() => {
                this.terminalChanged.emit();
            });
    }

    editWeight(terminalID: number, providerID: number) {
        const config = {
            data: this.getModalData(terminalID, providerID),
            width: '300px',
            disableClose: true
        };
        const dialog = this.dialog.open(EditTerminalDecisionWeightComponent, config);
        dialog
            .afterClosed()
            .pipe(filter(result => result))
            .subscribe(() => {
                this.terminalChanged.emit();
            });
    }

    private getModalData(terminalID: number, providerID: number) {
        return {
            shopID: this.shopID,
            partyID: this.partyID,
            terminalID,
            providerID
        };
    }
}
