import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { TerminalObject } from '../../../../../thrift-services/damsel/gen-model/domain';
import { TerminalID } from '../../../../../thrift-services/fistful/gen-model/fistful';

@Component({
    templateUrl: 'select-terminal.component.html',
    selector: 'cc-select-terminal',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectTerminalComponent {
    @Input() terminals: TerminalObject[];

    @Output() terminalIDSelected: EventEmitter<TerminalID> = new EventEmitter();

    terminalTabChanged() {
        this.terminalIDSelected.emit(null);
    }

    terminalSelected(id: number) {
        this.terminalIDSelected.emit(id);
    }
}
