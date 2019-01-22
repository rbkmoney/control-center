import { Component, Input, OnInit } from '@angular/core';
import { TerminalObject } from '../../../../../damsel/domain';
import { PartyService } from '../../../../party.service';

@Component({
    selector: 'cc-terminal',
    templateUrl: 'terminal.component.html'
})
export class TerminalComponent implements OnInit {
    @Input() terminalID: number;
    terminal: TerminalObject;

    constructor(private partyService: PartyService) {}

    ngOnInit(): void {
        this.partyService.getTerminal(this.terminalID).subscribe(terminalObject => {
            this.terminal = terminalObject;
        });
    }
}
