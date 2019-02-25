import { Component, Input } from '@angular/core';

import { TerminalObject } from '../../../gen-damsel/domain';

@Component({
    selector: 'cc-terminal',
    templateUrl: 'terminal.component.html'
})
export class TerminalComponent {
    @Input() terminal: TerminalObject;
    @Input() isActive: boolean;
}
