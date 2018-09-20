import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ActionType, ModificationAction } from '../modification-action';
import { DomainModificationInfo } from '../model';
import { CreateTerminalParams, DomainTypedManager } from '../../domain/domain-typed-manager';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClaimService } from '../claim.service';

@Component({
    templateUrl: 'create-domain-modification.component.html'
})
export class CreateDomainModificationComponent implements OnInit {

    isLoading = false;

    valid = false;

    partyId: string;

    values: CreateTerminalParams;

    unitID: string;

    domainModificationInfo$: Observable<DomainModificationInfo>;

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private claimService: ClaimService,
        private route: ActivatedRoute,
        private dialogRef: MatDialogRef<CreateDomainModificationComponent>,
        @Inject(MAT_DIALOG_DATA) public action: ModificationAction,
        private snackBar: MatSnackBar,
        private cdr: ChangeDetectorRef,
        private domainTypedManager: DomainTypedManager) {
    }

    ngOnInit() {
        this.route.firstChild.params.subscribe((params) => {
            this.partyId = params.partyId;
        });
        this.domainModificationInfo$ = this.claimService.domainModificationInfo$;
        this.form = this.fb.group({
            modification: this.fb.group({})
        });
    }

    valueChanges(e: any) {
        this.values = e;
    }

    statusChanges(status: string) {
        this.valid = status === 'VALID';
        this.cdr.detectChanges();
    }

    create() {
        this.isLoading = true;
        this.domainTypedManager
            .createTerminal(this.values as CreateTerminalParams).subscribe(() => {
            this.isLoading = false;
            this.dialogRef.close();
            this.snackBar.open(`${name} created`, 'OK', {duration: 3000});
        }, (error) => {
            console.error(error);
            this.isLoading = false;
            this.snackBar.open(`An error occurred while creating ${name}`, 'OK');
        });
    }

    getContainerType(type: ActionType): string {
        switch (type) {
            case ActionType.domainAction:
                return 'Domain modification';
        }
    }
}
