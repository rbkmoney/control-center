import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TerminalObject } from '../../../../damsel/domain';
import { MatTabChangeEvent } from '@angular/material';

@Component({
    selector: 'cc-select-terminal',
    templateUrl: 'select-terminal.component.html'
})
export class SelectTerminalComponent {
    @Output() formChanged: EventEmitter<any> = new EventEmitter();
    @Input() terminals: TerminalObject[];

    terminalTabChanged(event: MatTabChangeEvent) {
        this.formChanged.emit({ id: null });
    }

    terminalSelected(formValues: any) {
        this.formChanged.emit(formValues);
    }
}
