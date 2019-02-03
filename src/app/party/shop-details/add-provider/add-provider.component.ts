import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { map } from 'rxjs/operators';
import get from 'lodash-es/get';

import { CategoryRef, Shop } from '../../../gen-damsel/domain';
import { DomainTypedManager } from '../../../thrift/domain-typed-manager';
import { ProviderObject, TerminalObject } from '../../../damsel/domain';
import { CreateTerminalParams } from '../../../thrift/operations';
import { BehaviorSubject, Subject } from 'rxjs';
import { AddProviderDecision } from '../../../thrift/add-provider-decision';
import { TerminalFormChanged } from './terminal-form-changed';

interface AddProviderData {
    shop: Shop;
    partyId: string;
}

enum TerminalDecision {
    create = 0,
    chosen = 1
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
    terminalDecision: TerminalDecision;
    terminalFormValues: any;
    isLoading = false;
    selectedProvider: number;
    selectedTerminal: number;

    constructor(
        private dialogRef: MatDialogRef<AddProviderComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddProviderData,
        private dtm: DomainTypedManager,
        private snackBar: MatSnackBar
    ) {}

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
                        const isHaveDecisions = Array.isArray(get(obj, 'data.terminal.decisions'));
                        if (paymentCats && isHaveDecisions) {
                            return !!Array.from(paymentCats.values()).find(predicate);
                        }
                        if (recurrentCats && isHaveDecisions) {
                            return !!Array.from(recurrentCats.values()).find(predicate);
                        }
                        return null;
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

    terminalFormChanged(data: TerminalFormChanged) {
        const { valid, values } = data;
        this.terminalFormValid = valid;
        if (values) {
            this.terminalFormValues = values;
        }
    }

    terminalSelected(id: number) {
        this.selectedTerminal = id;
    }

    terminalTabChanged(event: MatTabChangeEvent) {
        switch (event.index) {
            case 0:
                this.terminalDecision = TerminalDecision.chosen;
                break;
            case 1:
                this.terminalDecision = TerminalDecision.create;
                break;
        }

        this.selectedTerminal = null;
        this.terminalFormValid = false;
    }

    add() {
        this.isLoading = true;
        if (this.terminalDecision === TerminalDecision.create) {
            this.createTerminal();
        } else {
            this.updateProvider();
        }
    }

    private createTerminal() {
        const terminalParams = {
            providerID: this.selectedProvider,
            partyID: this.data.partyId,
            shopID: this.data.shop.id,
            ...this.terminalFormValues
        } as CreateTerminalParams;
        this.dtm.createTerminal(terminalParams).subscribe(
            () => {
                this.handleSuccess();
            },
            e => {
                this.handleError(e);
            }
        );
    }

    private updateProvider() {
        this.isLoading = true;
        const params = {
            partyId: this.data.partyId,
            shopId: this.data.shop.id,
            terminalId: this.selectedTerminal,
            providerId: this.selectedProvider
        } as AddProviderDecision;
        this.dtm.addProviderDecision(params).subscribe(
            () => {
                this.handleSuccess();
            },
            e => {
                this.handleError(e);
            }
        );
    }

    private handleSuccess() {
        this.isLoading = false;
        this.snackBar.open('Successfully added', 'OK', { duration: 3000 });
        this.dialogRef.close(true);
    }

    private handleError(e: any) {
        this.isLoading = false;
        this.snackBar.open('An error occurred while while adding provider', 'OK');
        console.error(e);
    }
}
