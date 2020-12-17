import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateTerminalService } from '../../services/create-terminal';

@Component({
    selector: 'cc-create-terminal-form',
    templateUrl: 'create-terminal-form.component.html',
    providers: [CreateTerminalService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTerminalFormComponent {
    @Output() terminalIDSelected: EventEmitter<number> = new EventEmitter();

    form = this.createTerminalService.form;
    riskCoverages = [
        {
            name: 'low',
            value: 0,
        },
        {
            name: 'high',
            value: 100,
        },
        {
            name: 'fatal',
            value: 9999,
        },
    ];
    options = this.form.controls.options as FormGroup;

    inProgress$ = this.createTerminalService.inProgress$;

    constructor(private createTerminalService: CreateTerminalService) {
        this.createTerminalService.saved$.subscribe((id) => this.terminalIDSelected.emit(id));
    }

    addOption() {
        this.createTerminalService.addOption();
    }

    removeOption(index: number) {
        this.createTerminalService.removeOption(index);
    }

    save() {
        this.createTerminalService.save();
    }
}
