import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { DomainModificationInfo } from '../../../claim/model';
import { TerminalObjectService } from './terminal-object.service';
import { ProviderObject } from '../../../damsel/domain';
import { DomainTypedManager } from '../../../domain/domain-typed-manager';
import { ClaimService } from '../../../claim/claim.service';

@Component({
    selector: 'cc-terminal-object',
    templateUrl: 'terminal-object.component.html',
    providers: [TerminalObjectService]
})
export class TerminalObjectComponent implements OnInit, OnChanges {

    @Input()
    domainModificationInfo: DomainModificationInfo;

    @Input()
    form: FormGroup;

    @Input()
    unitID: string;

    providerObjects$: Observable<ProviderObject[]>;

    optionTemplates: string[];

    riskCoverages: Array<{ name: string, value: number }>;

    constructor(private fb: FormBuilder,
                private terminalObjectService: TerminalObjectService,
                private domainTypedManager: DomainTypedManager,
                private claimService: ClaimService) {
    }

    ngOnInit() {
        this.form.setControl('modification', this.terminalObjectService.initForm(this.domainModificationInfo));
        this.providerObjects$ = this.domainTypedManager.getProviderObjects();
        this.optionTemplates = this.terminalObjectService.optionTemplates;
        this.riskCoverages = this.terminalObjectService.riskCoverages;
    }

    ngOnChanges(e: SimpleChanges) {
        const form = this.form.get('modification');
        if (e.domainModificationInfo && form) {
            form.patchValue({
                shopUrl: e.domainModificationInfo.currentValue.shopUrl,
                shopID: e.domainModificationInfo.currentValue.shopId,
                partyID: e.domainModificationInfo.currentValue.partyId
            });
        }
        if (e.unitID) {
            this.claimService.domainModificationInfo$.next({...this.domainModificationInfo, shopId: e.unitID.currentValue});
        }
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
