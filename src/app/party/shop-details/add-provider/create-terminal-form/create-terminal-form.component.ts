import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateTerminalFormService } from './create-terminal-form.service';

@Component({
    selector: 'cc-create-terminal-form',
    templateUrl: 'create-terminal-form.component.html',
    providers: [CreateTerminalFormService]
})
export class CreateTerminalFormComponent implements OnInit {
    @Input() form: FormGroup;
    @Output() terminalFormValid: EventEmitter<boolean> = new EventEmitter();

    riskCoverages: Array<{ name: string; value: number }>;
    options: FormGroup;

    constructor(private createTerminalFormService: CreateTerminalFormService) {}

    ngOnInit(): void {
        const { form } = this.createTerminalFormService;
        this.form = form;
        this.riskCoverages = this.createTerminalFormService.riskCoverages;

        this.form.valueChanges.subscribe(() => {
            this.options = this.form.controls.options as FormGroup;
        });

        this.form.valueChanges.subscribe(() => {
            this.terminalFormValid.emit(this.form.valid);
            // this.terminalDecision = TerminalDecision.create;
        });
    }

    addOption() {
        this.createTerminalFormService.addOption();
    }

    removeOption(index: number) {
        this.createTerminalFormService.removeOption(index);
    }
}
