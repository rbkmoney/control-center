import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TerminalObject } from '../../../../damsel/domain';

@Component({
    selector: 'cc-select-terminal',
    templateUrl: 'select-terminal.component.html',
    styleUrls: ['select-terminal.component.scss']
})
export class SelectTerminalComponent {
    @Input() terminals: TerminalObject[];
    @Output() terminalIdSelected: EventEmitter<number> = new EventEmitter();

    terminalTabChanged() {
        this.terminalIdSelected.emit(null);
    }

    terminalSelected(id: number) {
        this.terminalIdSelected.emit(id);
    }
}
