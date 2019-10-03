import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { CreateDepositService, CurrencySource } from './create-deposit.service';

@Component({
    selector: 'cc-create-deposit',
    templateUrl: 'create-deposit.component.html'
})
export class CreateDepositComponent implements OnInit {
    form: FormGroup;

    currencies: CurrencySource[];

    isLoading$: Observable<boolean>;

    constructor(private createDepositService: CreateDepositService) {}

    ngOnInit() {
        this.form = this.createDepositService.getForm();
        this.currencies = this.createDepositService.getCurrencies();
        this.isLoading$ = this.createDepositService.isLoading$;
    }

    createDeposit() {
        this.createDepositService.createDeposit();
    }
}
