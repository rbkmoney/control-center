import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { TerminalID } from '../../../../../thrift-services/fistful/gen-model/fistful';
import { TerminalAction, TerminalActionTypes, TerminalInfo } from '../../types';

@Component({
    selector: 'cc-terminals-info-table',
    styleUrls: ['terminals-info-table.component.scss'],
    templateUrl: 'terminals-info-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalsInfoTableComponent {
    @Input()
    terminalsInfo: TerminalInfo[];

    @Output() action: EventEmitter<TerminalAction> = new EventEmitter();

    displayedColumns = ['name', 'description', 'type', 'priority', 'weight', 'status', 'actions'];
    terminalActionTypes = TerminalActionTypes;

    actions(type: TerminalActionTypes, terminalID: TerminalID) {
        this.action.emit({ type, terminalID });
    }
}
