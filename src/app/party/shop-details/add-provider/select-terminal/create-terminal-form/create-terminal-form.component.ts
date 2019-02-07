import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateTerminalFormService } from './create-terminal-form.service';
import { DomainTypedManager } from '../../../../../thrift';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'cc-create-terminal-form',
    templateUrl: 'create-terminal-form.component.html',
    styleUrls: ['../../add-provider.component.scss'],
    providers: [CreateTerminalFormService, DomainTypedManager]
})
export class CreateTerminalFormComponent implements OnInit {
    @Output() terminalSelected: EventEmitter<any> = new EventEmitter();

    form: FormGroup;
    riskCoverages: Array<{ name: string; value: number }>;
    options: FormGroup;
    isLoading = false;
    saved = false;

    constructor(
        private createTerminalFormService: CreateTerminalFormService,
        private dtm: DomainTypedManager,
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
        this.dtm.newCreateTerminal(this.form.value).subscribe(
            terminalObject => {
                this.terminalSelected.emit({ id: terminalObject.ref.id });
                this.isLoading = false;
                this.saved = true;
                this.snackBar.open('Terminal successfully added', 'OK', { duration: 3000 });
            },
            e => {
                this.isLoading = false;
                this.saved = false;
                this.snackBar.open('An error occurred while while adding provider', 'OK');
                console.error(e);
            }
        );
    }
}
