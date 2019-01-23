import { Component, Input, OnInit } from '@angular/core';
import { TerminalObject } from '../../../../../damsel/domain';
import { DomainTypedManager } from '../../../../../thrift/domain-typed-manager';

@Component({
    selector: 'cc-terminal',
    templateUrl: 'terminal.component.html'
})
export class TerminalComponent implements OnInit {
    @Input() terminalID: number;
    terminal: TerminalObject;

    constructor(private dtm: DomainTypedManager) {}

    ngOnInit(): void {
        this.dtm.getTerminalObject(this.terminalID).subscribe(terminalObject => {
            this.terminal = terminalObject;
        });
    }
}
