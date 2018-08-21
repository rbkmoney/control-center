import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { CreateLegalAgreementService } from './create-legal-agreement.service';

@Component({
    selector: 'cc-create-legal-agreement',
    templateUrl: './create-legal-agreement.component.html'
})
export class CreateLegalAgreementComponent implements OnInit {

    form: FormGroup;

    constructor(private createLegalAgreementService: CreateLegalAgreementService) {
    }

    ngOnInit() {
        this.form = this.createLegalAgreementService.form;
    }
}
