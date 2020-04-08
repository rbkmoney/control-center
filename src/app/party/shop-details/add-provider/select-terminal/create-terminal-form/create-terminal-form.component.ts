import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CreateTerminalFormService } from './create-terminal-form.service';

@Component({
    selector: 'cc-create-terminal-form',
    templateUrl: 'create-terminal-form.component.html',
    styleUrls: ['../../add-provider.component.scss'],
    providers: [CreateTerminalFormService],
})
export class CreateTerminalFormComponent implements OnInit {
    @Output() terminalIdSelected: EventEmitter<number> = new EventEmitter();

    form: FormGroup;
    riskCoverages: Array<{ name: string; value: number }>;
    options: FormGroup;
    isLoading = false;
    saved = false;

    constructor(
        private createTerminalFormService: CreateTerminalFormService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        const { form } = this.createTerminalFormService;
        this.form = form;
        this.form.valueChanges.subscribe(() => {
            this.saved = false;
        });
        this.riskCoverages = this.createTerminalFormService.riskCoverages;
        this.options = this.form.controls.options as FormGroup;
    }

    addOption() {
        this.createTerminalFormService.addOption();
    }

    removeOption(index: number) {
        this.createTerminalFormService.removeOption(index);
    }

    save() {
        this.isLoading = true;
        this.createTerminalFormService.saveTerminal().subscribe(
            (terminalID) => {
                this.terminalIdSelected.emit(terminalID);
                this.isLoading = false;
                this.saved = true;
                this.snackBar.open('Terminal successfully added', 'OK', { duration: 3000 });
            },
            (e) => {
                this.isLoading = false;
                this.saved = false;
                this.snackBar.open('An error occurred while while adding provider', 'OK');
                console.error(e);
            }
        );
    }
}
