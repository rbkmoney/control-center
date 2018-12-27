import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';

import { TerminalDecisionsComponent } from './domain/terminal-decisions/terminal-decisions.component';
import { Party } from '../../damsel/domain';

@Component({
    selector: 'cc-party-actions',
    templateUrl: 'party-actions.component.html'
})
export class PartyActionsComponent {

    @Input()
    party: Party;

    constructor(private dialog: MatDialog) {}

    openTerminalDecisions() {
        this.dialog.open(TerminalDecisionsComponent, {
            disableClose: true,
            width: '60vw',
            data: this.party
        })
    }
}
