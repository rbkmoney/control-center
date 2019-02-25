import { Component, Input } from '@angular/core';

import { TerminalObject } from '../../../gen-damsel/domain';

@Component({
    selector: 'cc-terminal',
    templateUrl: 'terminal.component.html',
    styleUrls: ['terminal.component.scss']
})
export class TerminalComponent {
    @Input() terminal: TerminalObject;
    @Input() isActive: boolean;

    getIsActiveClass(status: boolean) {
        return status ? 'isActive-badge active' : 'isActive-badge inactive';
    }
}
