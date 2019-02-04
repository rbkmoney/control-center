import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators';

import { DomainModificationInfo } from '../model';
import { TerminalObjectService } from './terminal-object.service';
import { ProviderObject } from '../../damsel/domain';
import { CreateTerminalParams } from '../../thrift/operations/create-terminal-params';
import { DomainTypedManager } from '../../thrift/domain-typed-manager';

@Component({
    selector: 'cc-terminal-object',
    templateUrl: 'terminal-object.component.html',
    providers: [TerminalObjectService]
})
export class TerminalObjectComponent implements OnInit {
    @Input()
    domainModificationInfo: DomainModificationInfo;

    @Output()
    valueChanges: EventEmitter<CreateTerminalParams> = new EventEmitter();

    @Output()
    statusChanges: EventEmitter<'VALID' | 'INVALID'> = new EventEmitter();

    form: FormGroup;

    options: FormGroup;

    providerObjects$: Observable<ProviderObject[]>;

    optionTemplates: string[];

    riskCoverages: Array<{ name: string; value: number }>;

    isLoading = true;

    constructor(
        private fb: FormBuilder,
        private terminalObjectService: TerminalObjectService,
        private domainTypedManager: DomainTypedManager,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.form = this.terminalObjectService.initForm(this.domainModificationInfo);
        this.providerObjects$ = this.domainTypedManager
            .getProviderObjectsWithSelector('decisions')
            .pipe(
                tap(
                    () => {
                        this.isLoading = false;
                        this.form.controls.providerID.enable();
                    },
                    () => {
                        this.snackBar.open(
                            'An error occurred while provider object receiving',
                            'OK'
                        );
                    }
                )
            );
        this.optionTemplates = this.terminalObjectService.optionTemplates;
        this.riskCoverages = this.terminalObjectService.riskCoverages;
        this.form.statusChanges.subscribe(status => {
            this.statusChanges.emit(status);
        });
        this.form.valueChanges.subscribe(value => {
            this.options = this.form.controls.options as FormGroup;
            this.valueChanges.emit(value);
        });
    }

    setBankOptionsTemplate(selectedOption: string) {
        this.terminalObjectService.setBankOptionsTemplate(selectedOption);
    }

    addOption() {
        this.terminalObjectService.addOption();
    }

    removeOption(index: number) {
        this.terminalObjectService.removeOption(index);
    }
}
