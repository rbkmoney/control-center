import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { DomainTypedManager } from '../../../../thrift/domain-typed-manager';
import { TerminalDecisionItem } from './terminal-decision-item';
import { TerminalDecisionsService } from './terminal-decisions.service';
import { Party, ProviderObject, Shop, TerminalDecision } from '../../../../damsel/domain';
import * as DomainTypes from './../../../../domain/gen-nodejs/domain_types';

@Component({
    templateUrl: 'terminal-decisions.component.html',
    providers: [DomainTypedManager, TerminalDecisionsService]
})
export class TerminalDecisionsComponent implements OnInit {

    public items: TerminalDecisionItem[];
    public providers: ProviderObject[];
    public shopForm: FormGroup;
    public targetsForm: FormGroup;
    public decisionForm: FormGroup;
    public sources: ProviderObject[];
    public source: ProviderObject;
    public destinations: ProviderObject[];
    public destination: ProviderObject;
    public decisions: TerminalDecision[];
    public decision: TerminalDecision;


    constructor(private domainTypedManager: DomainTypedManager,
                private terminalDecisionsService: TerminalDecisionsService,
                @Inject(MAT_DIALOG_DATA) public party: Party) {
    }

    ngOnInit(): void {
        this.shopForm = this.terminalDecisionsService.shopForm;
        this.targetsForm = this.terminalDecisionsService.targetsForm;
        this.decisionForm = this.terminalDecisionsService.decisionForm;
        this.domainTypedManager.getProviderObjects().subscribe((providers) => {
            this.providers = providers;
            this.destinations = providers;
            this.items = providers
                .filter((provider) => {
                    const { terminal } = provider.data;
                    return terminal.decisions ? terminal.decisions.filter((decision) =>
                        get(decision, ['if_', 'condition', 'party', 'if']) === this.party.id)
                        : false;
                }).map((providerObject) => ({
                    selected: false, providerObject
                }));
            this.items = this.items.map((item) => ({ ...item, selected: false }));
        });
        this.shopForm.valueChanges.subscribe((values) => {
            if (values.shopId) {
                this.sources = this.items
                   .filter((item) => item.providerObject.data.terminal.decisions
                        .filter((decision) => get(decision, ['if_', 'condition', 'party', 'definition', 'shop_is']) === values.shopId))
                   .map((item) => item.providerObject);
            }
        });
        this.targetsForm.valueChanges.subscribe((values) => {
            if (values.source) {
                this.decisions = this.items.find((item) => item.providerObject.ref.id === values.source).providerObject.data.terminal.decisions;
                this.source = this.providers.find((provider) => provider.ref.id === values.source);
            }
            if (values.destination) {
                this.destination = this.providers.find((provider) => provider.ref.id === values.destination);
            }
        });
        this.decisionForm.valueChanges.subscribe((values) => {
            if (values.decision) {
                this.decision = values.decision;
            }
        });
    }

    public getShops(): Shop[] {
        return Array.from(this.party.shops.values());
    }

    public toString(heh: any) {
        return JSON.stringify(heh);
    }

    public commit() {
        const groupName = 'provider';
        const ref = new DomainTypes.Reference();
        ref[groupName] = {};
        const newObject = new DomainTypes.DomainObject();
    }
}
