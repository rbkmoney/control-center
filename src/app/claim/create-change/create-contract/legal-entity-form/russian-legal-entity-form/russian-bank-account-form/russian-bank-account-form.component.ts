import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RussianBankAccountFormService } from './russian-bank-account-form.service';

@Component({
    selector: 'cc-russian-bank-account-form',
    templateUrl: 'russian-bank-account-form.component.html'
})
export class RussianBankAccountFormComponent implements OnInit {

    form: FormGroup;

    constructor(private russianBankAccountFormService: RussianBankAccountFormService) {
    }

    ngOnInit() {
        this.form = this.russianBankAccountFormService.form;
    }
}
