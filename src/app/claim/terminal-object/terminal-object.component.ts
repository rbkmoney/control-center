import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { DomainModificationInfo } from '../model';
import { TerminalObjectService } from './terminal-object.service';
import { ProviderObject } from '../../damsel/domain';
import { CreateTerminalParams, DomainTypedManager } from '../../domain/domain-typed-manager';

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

    providerObjects$: Observable<ProviderObject[]>;

    optionTemplates: string[];

    riskCoverages: Array<{ name: string, value: number }>;

    constructor(private fb: FormBuilder,
                private terminalObjectService: TerminalObjectService,
                private domainTypedManager: DomainTypedManager) {
    }

    ngOnInit() {
        this.form = this.terminalObjectService.initForm(this.domainModificationInfo);
        this.providerObjects$ = this.domainTypedManager.getProviderObjectsWithSelector('decisions');
        this.optionTemplates = this.terminalObjectService.optionTemplates;
        this.riskCoverages = this.terminalObjectService.riskCoverages;
        this.form.statusChanges.subscribe((status) => {
            this.statusChanges.emit(status);
        });
        this.form.valueChanges.subscribe((value) => {
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
