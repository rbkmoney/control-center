import { Component, Input } from '@angular/core';

import { TerminalInfo } from '../../types';

@Component({
    selector: 'cc-terminals-info-table',
    styleUrls: ['terminals-info-table.component.scss'],
    templateUrl: 'terminals-info-table.component.html',
})
export class TerminalsInfoTableComponent {
    @Input()
    terminalsInfo: TerminalInfo[];

    displayedColumns = ['name', 'description', 'type', 'priority', 'weight', 'status'];
}
