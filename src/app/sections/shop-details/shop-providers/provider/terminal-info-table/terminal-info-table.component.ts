import { Component, Input } from '@angular/core';

import { TerminalInfo } from '../../types';

@Component({
    selector: 'cc-terminal-info-table',
    styleUrls: ['terminal-info-table.component.scss'],
    templateUrl: 'terminal-info-table.component.html',
})
export class TerminalInfoTableComponent {
    @Input()
    terminalInfo: TerminalInfo[];

    displayedColumns = ['name', 'description', 'type', 'priority', 'weight', 'status'];
}
