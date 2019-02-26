import { Component, Input } from '@angular/core';

import { TerminalObject } from '../../../gen-damsel/domain';
import { PredicateType } from '../extract-terminal-info';

@Component({
    selector: 'cc-terminal',
    templateUrl: 'terminal.component.html',
    styleUrls: ['terminal.component.scss']
})
export class TerminalComponent {
    @Input() terminal: TerminalObject;
    @Input() disabled: boolean;
    @Input() predicateType: PredicateType;
}
