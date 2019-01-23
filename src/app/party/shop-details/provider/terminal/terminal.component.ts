import { Component, Input, OnInit } from '@angular/core';
import { TerminalObject } from '../../../../damsel/domain';
import { ShopDetailsService } from '../../shop-details.service';

@Component({
    selector: 'cc-terminal',
    templateUrl: 'terminal.component.html'
})
export class TerminalComponent implements OnInit {
    @Input() terminalID: number;
    terminal: TerminalObject;

    constructor(private shopDetailsService: ShopDetailsService) {}

    ngOnInit(): void {
        this.shopDetailsService.getTerminalObject(this.terminalID).subscribe(terminalObject => {
            this.terminal = terminalObject;
        });
    }
}
