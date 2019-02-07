import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { DomainTypedManager, AddDecisionToProvider } from '../../../thrift';
import { AddProviderService } from './add-provider.service';
import { ProviderObject, TerminalObject } from '../../../damsel/domain';

interface AddProviderData {
    partyID: string;
    shopID: string;
    shopCategory: number;
}

@Component({
    templateUrl: 'add-provider.component.html',
    styleUrls: ['add-provider.component.scss'],
    providers: [AddProviderService]
})
export class AddProviderComponent implements OnInit {
    terminals$: Observable<TerminalObject[]>;
    providers$: Observable<ProviderObject[]>;
    isLoading = false;
    terminalForm: FormGroup;
    providerForm: FormGroup;

    constructor(
        private dialogRef: MatDialogRef<AddProviderComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddProviderData,
        private dtm: DomainTypedManager,
        private snackBar: MatSnackBar,
        private addProviderService: AddProviderService
    ) {}

    ngOnInit(): void {
        this.providerForm = this.addProviderService.providerForm;
        this.terminalForm = this.addProviderService.terminalForm;
        this.terminals$ = this.addProviderService.getTerminals();
        this.providers$ = this.addProviderService.getProviders(this.data.shopCategory);
    }

    providerFormChanged(formValues: any) {
        this.providerForm.setValue(formValues);
    }

    terminalFormChanged(formValues: any) {
        this.terminalForm.setValue(formValues);
    }

    add() {
        this.isLoading = true;
        const params = {
            partyID: this.data.partyID,
            shopID: this.data.shopID,
            terminalID: this.terminalForm.value['id'],
            providerID: this.providerForm.value['id']
        } as AddDecisionToProvider;
        this.dtm.addProviderDecision(params).subscribe(
            () => {
                this.isLoading = false;
                this.snackBar.open('Provider successfully added', 'OK', { duration: 3000 });
                this.dialogRef.close(true);
            },
            e => {
                this.isLoading = false;
                this.snackBar.open('An error occurred while while adding provider', 'OK');
                console.error(e);
            }
        );
    }
}
