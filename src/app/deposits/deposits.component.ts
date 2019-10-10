import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DepositsService } from './deposits.service';
import { CreateDepositComponent } from './create-deposit/create-deposit.component';
import { StatDeposit } from '../fistful/gen-model/fistful_stat';
import { BehaviorSubject } from 'rxjs';
import { SearchFormParams } from './search-form/search-form-params';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    templateUrl: 'deposits.component.html'
})
export class DepositsComponent implements OnInit {

    searchParams: SearchFormParams;

    formValid: boolean;

    deposits$: BehaviorSubject<StatDeposit[]>;

    continuationToken$: BehaviorSubject<string>;

    isLoading = false;

    constructor(
        private depositsService: DepositsService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.deposits$ = this.depositsService.deposits$;
        this.continuationToken$ = this.depositsService.continuationToken$;
    }

    formValueChanges(params: SearchFormParams) {
        this.searchParams = params;
    }

    formStatusChanges(status: string) {
        this.formValid = status === 'VALID';
    }

    search() {
        this.isLoading = true;
        this.depositsService.search(this.searchParams).subscribe(
            () => {
                this.isLoading = false;
            },
            () => {
                this.isLoading = false;
                this.snackBar.open('An error occurred while deposit search', 'OK');
            }
        );
    }

    fetchMore() {
        this.isLoading = true;
        this.depositsService.fetchMore().subscribe(
            () => {
                this.isLoading = false;
            },
            () => {
                this.isLoading = false;
                this.snackBar.open('An error occurred while deposit search', 'OK');
            }
        );
    }

    createDeposit() {
        this.dialog.open(CreateDepositComponent);
    }

}
