import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { FetchTerminalService } from './fetch-terminal.service';

@Component({
    selector: 'cc-payment-terminal',
    templateUrl: 'payment-terminal.component.html',
    providers: [FetchTerminalService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentTerminalComponent implements OnInit {
    @Input()
    terminalID: number;

    terminal$ = this.fetchTerminalService.terminal$;
    inProgress$ = this.fetchTerminalService.inProgress$;

    constructor(private fetchTerminalService: FetchTerminalService) {}

    ngOnInit() {
        this.fetchTerminalService.getTerminal(this.terminalID);
    }
}
