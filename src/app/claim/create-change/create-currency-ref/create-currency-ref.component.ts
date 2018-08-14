import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateCurrencyRefService } from './create-currency-ref.service';

@Component({
    selector: 'cc-create-currency-ref',
    templateUrl: 'create-currency-ref.component.html'
})
export class CreateCurrencyRefComponent implements OnInit {

    form: FormGroup;

    constructor(private createCurrencyRefService: CreateCurrencyRefService) {
    }

    ngOnInit() {
        this.form = this.createCurrencyRefService.form;
    }
}
