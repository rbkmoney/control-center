import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TerminalObject } from '../../../../damsel/domain';

@Component({
    selector: 'cc-select-terminal',
    templateUrl: 'select-terminal.component.html'
})
export class SelectTerminalComponent {
    @Output() formChanged: EventEmitter<number> = new EventEmitter();
    @Input() terminals: TerminalObject[];

    terminalTabChanged() {
        this.formChanged.emit(null);
    }

    terminalSelected(id: number) {
        this.formChanged.emit(id);
    }
}
