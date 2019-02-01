import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTabChangeEvent } from '@angular/material';
import { map, switchMap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import get from 'lodash-es/get';

import { CategoryRef, Party, Shop } from '../../../gen-damsel/domain';
import { DomainTypedManager } from '../../../thrift/domain-typed-manager';
import { ProviderObject, TerminalObject } from '../../../damsel/domain';
import { CreateTerminalParams } from '../../../claim/domain-typed-manager';
import { BehaviorSubject, Subject } from 'rxjs';

interface AddProviderData {
    shop: Shop;
    partyId: string;
}

enum Step {
    provider = 0,
    terminal = 1
}

enum TerminalDecision {
    create = 0,
    choosen = 1
}

@Component({
    templateUrl: 'add-provider.component.html',
    styleUrls: ['add-provider.component.scss']
})
export class AddProviderComponent implements OnInit {
    terminals$: Subject<TerminalObject[]> = new BehaviorSubject(null);
    providers$: Subject<ProviderObject[]> = new BehaviorSubject(null);
    providerFormValid: boolean;
    terminalFormValid: boolean;
    currentStep = Step.provider;
    terminalDecision: TerminalDecision;

    selectedProvider: number;
    selectedTerminal: number;

    constructor(
        private dialogRef: MatDialogRef<AddProviderComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddProviderData,
        private dtm: DomainTypedManager
    ) {
    }

    ngOnInit(): void {
        this.dtm
            .getProviderObjects()
            .pipe(
                map(objects =>
                    objects.filter(obj => {
                        const predicate = (category: CategoryRef) =>
                            category.id === this.data.shop.category.id;
                        const paymentCats = get(obj, 'data.payment_terms.categories.value');
                        const recurrentCats = get(
                            obj,
                            'data.recurrent_paytool_terms.categories.value'
                        );
                        return paymentCats
                            ? !!Array.from(paymentCats.values()).find(predicate)
                            : null || recurrentCats
                                ? !!Array.from(recurrentCats.values()).find(predicate)
                                : null;
                    })
                )
            )
            .subscribe(providerObjects => {
                this.providers$.next(providerObjects as ProviderObject[]);
            });
        this.dtm.getTerminalObjects().subscribe(terminals => {
            this.terminals$.next(Array.from(terminals.values()));
        });
    }

    providerFormChanged(formStatus: boolean) {
        this.providerFormValid = formStatus;
    }

    providerSelected(id: number) {
        this.selectedProvider = id;
    }

    terminalFormChanged(formStatus: boolean) {
        this.terminalFormValid = formStatus;
    }

    terminalSelected(id: number) {
        this.selectedTerminal = id;
    }

    terminalTabChanged(event: MatTabChangeEvent) {
        switch (event.index) {
            case 0:
                this.terminalDecision = TerminalDecision.choosen;
                break;
            case 1:
                this.terminalDecision = TerminalDecision.create;
                break;
        }

        this.selectedTerminal = null;
        this.terminalFormValid = false;
    }

    add() {
        if (this.terminalDecision === TerminalDecision.create) {
            const terminalParams = {
                providerID: this.selectedProvider,
                partyID: this.data.partyId,
                shopID: this.data.shop.id,
                ...this.terminalForm.value
            } as CreateTerminalParams;
            this.dtm
                .createTerminal(terminalParams)
                .pipe(
                    switchMap(() => this.dtm.getTerminalObjects()),
                    map((terminalObjects: TerminalObject[]) =>
                        terminalObjects.find(
                            obj =>
                                obj.data.name === this.terminalForm.value['terminalName'] &&
                                obj.data.description ===
                                this.terminalForm.value['terminalDescription']
                        )
                    )
                )
                .subscribe(terminal => {
                    this.selectedTerminal = terminal.ref.id;
                    this.updateProvider();
                });
        } else {
            this.updateProvider();
        }
    }

    private updateProvider() {
        console.log({
            if_: {
                condition: {
                    party: {
                        id: this.data.partyId,
                        definition: {
                            shop_is: this.data.shop.id
                        }
                    }
                }
            },
            then_: {
                value: [{ id: this.selectedTerminal }]
            }
        });
    }
}
