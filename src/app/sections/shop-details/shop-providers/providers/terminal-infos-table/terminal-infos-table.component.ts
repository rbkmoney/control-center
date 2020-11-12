import { Component, Input } from '@angular/core';

import { PredicateType } from '../../../../../party/shop-details/extract-terminal-info';
import { TerminalInfo } from '../../provider-info';

@Component({
    selector: 'cc-terminal-infos-table',
    templateUrl: 'terminal-infos-table.component.html',
})
export class TerminalInfosTableComponent {
    @Input()
    terminalInfos: TerminalInfo[];
    displayedColumns = ['name', 'description', 'type', 'priority', 'weight', 'status', 'actions'];

    isWeightOrPriorityEditable(predicate: PredicateType) {
        return predicate === PredicateType.condition;
    }

    isEditable(predicateType: PredicateType) {
        return predicateType === PredicateType.condition || predicateType === PredicateType.any_of;
    }
}
