import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { ProviderObject, TerminalObject } from '../../../thrift-services/damsel/gen-model/domain';
import { AddProviderService } from './add-provider.service';

interface AddProviderData {
    partyID: string;
    shopID: string;
    shopCategoryID: number;
}

@Component({
    templateUrl: 'add-provider.component.html',
    styleUrls: ['add-provider.component.scss'],
    providers: [AddProviderService],
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
        private snackBar: MatSnackBar,
        private addProviderService: AddProviderService
    ) {}

    ngOnInit() {
        this.providerForm = this.addProviderService.providerForm;
        this.terminalForm = this.addProviderService.terminalForm;
        this.terminals$ = this.addProviderService.getTerminals();
        this.providers$ = this.addProviderService.getProviders(this.data.shopCategoryID);
    }

    providerFormChanged(id: number) {
        this.providerForm.setValue({ id });
    }

    terminalFormChanged(id: number) {
        this.terminalForm.setValue({ id });
    }

    add() {
        this.isLoading = true;
        this.addProviderService.addProvider(this.data.partyID, this.data.shopID).subscribe(
            () => {
                this.isLoading = false;
                this.snackBar.open('Provider successfully added', 'OK', { duration: 3000 });
                this.dialogRef.close(true);
            },
            (e) => {
                this.isLoading = false;
                this.snackBar.open('An error occurred while while adding provider', 'OK');
                console.error(e);
            }
        );
    }
}
