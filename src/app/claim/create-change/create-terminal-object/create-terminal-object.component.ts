import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { CreateTerminalObjectService } from './create-terminal-object.service';
import { DomainTypedManager } from '../../../thrift/domain-typed-manager';
import { ProviderObject } from '../../../damsel/domain';
import { DomainModificationInfo } from '../../model';

@Component({
    selector: 'cc-create-terminal-object',
    templateUrl: 'create-terminal-object.component.html'
})
export class CreateTerminalObjectComponent implements OnInit, OnChanges {

    @Input()
    domainModificationInfo: DomainModificationInfo;

    form: FormGroup;

    providerObjects$: Observable<ProviderObject[]>;

    optionTemplates: string[];

    riskCoverages: Array<{ name: string, value: number }>;

    constructor(private createTerminalObjectService: CreateTerminalObjectService,
                private domainTypedManager: DomainTypedManager) {
    }

    ngOnInit() {
        this.providerObjects$ = this.domainTypedManager.getProviderObjects();
        this.optionTemplates = this.createTerminalObjectService.optionTemplates;
        this.riskCoverages = this.createTerminalObjectService.riskCoverages;
    }

    ngOnChanges() {
        if (this.domainModificationInfo) {
            this.form = this.createTerminalObjectService.initForm(this.domainModificationInfo);
        }
    }

    setBankOptionsTemplate(selectedOption: string) {
        this.createTerminalObjectService.setBankOptionsTemplate(selectedOption);
    }

    addOption() {
        this.createTerminalObjectService.addOption();
    }

    removeOption(index: number) {
        this.createTerminalObjectService.removeOption(index);
    }
}
