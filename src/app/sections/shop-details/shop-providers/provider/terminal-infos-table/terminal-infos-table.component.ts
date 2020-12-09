import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { TerminalID } from '../../../../../thrift-services/fistful/gen-model/fistful';
import { TerminalActionTypes, TerminalInfo } from '../../types';
import { TerminalAction } from '../../types/terminal-action';

@Component({
    selector: 'cc-terminal-infos-table',
    styleUrls: ['terminal-infos-table.component.scss'],
    templateUrl: 'terminal-infos-table.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TerminalInfosTableComponent {
    @Input() terminalInfos: TerminalInfo[];

    @Output() action: EventEmitter<TerminalAction> = new EventEmitter();

    displayedColumns = ['name', 'description', 'type', 'priority', 'weight', 'status', 'actions'];
    terminalActionTypes = TerminalActionTypes;

    actions(type: TerminalActionTypes, terminalID: TerminalID) {
        this.action.emit({ type, terminalID });
    }
}
