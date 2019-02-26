import { Component, Input } from '@angular/core';

import { TerminalObject } from '../../../gen-damsel/domain';
import { DecisionType } from '../find-terminal-infos';

@Component({
    selector: 'cc-terminal',
    templateUrl: 'terminal.component.html',
    styleUrls: ['terminal.component.scss']
})
export class TerminalComponent {
    @Input() terminal: TerminalObject;
    @Input() isActive: boolean;
    @Input() decisionType: DecisionType;
}
