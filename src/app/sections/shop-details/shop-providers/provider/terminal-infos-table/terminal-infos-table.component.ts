import { Component, Input } from '@angular/core';

import { TerminalInfo } from '../../services';

@Component({
    selector: 'cc-terminal-infos-table',
    styleUrls: ['terminal-infos-table.component.scss'],
    templateUrl: 'terminal-infos-table.component.html',
})
export class TerminalInfosTableComponent {
    @Input()
    terminalInfos: TerminalInfo[];

    displayedColumns = ['name', 'description', 'type', 'priority', 'weight', 'status'];
}
