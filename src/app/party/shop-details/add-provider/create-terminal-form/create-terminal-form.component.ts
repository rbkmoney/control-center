import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateTerminalFormService } from './create-terminal-form.service';
import { TerminalFormChanged } from '../terminal-form-changed';

@Component({
    selector: 'cc-create-terminal-form',
    templateUrl: 'create-terminal-form.component.html',
    providers: [CreateTerminalFormService]
})
export class CreateTerminalFormComponent implements OnInit {
    @Output() formChanged: EventEmitter<TerminalFormChanged> = new EventEmitter();

    form: FormGroup;
    riskCoverages: Array<{ name: string; value: number }>;
    options: FormGroup;

    constructor(private createTerminalFormService: CreateTerminalFormService) {}

    ngOnInit(): void {
        const { form } = this.createTerminalFormService;
        this.form = form;
        this.riskCoverages = this.createTerminalFormService.riskCoverages;
        this.options = this.form.controls.options as FormGroup;

        this.form.valueChanges.subscribe(values => {
            this.formChanged.emit({ valid: this.form.valid, values });
        });
    }

    addOption() {
        this.createTerminalFormService.addOption();
    }

    removeOption(index: number) {
        this.createTerminalFormService.removeOption(index);
    }
}
