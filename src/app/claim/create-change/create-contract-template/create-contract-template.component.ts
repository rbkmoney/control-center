import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

import { CreateContractTemplateService } from './create-contract-template.service';
import { ContractTemplate } from '../../../backend/model';

@Component({
    selector: 'cc-create-contract-template',
    templateUrl: 'create-contract-template.component.html'
})
export class CreateContractTemplateComponent implements OnInit {

    contracts$: Observable<ContractTemplate[]>;

    form: FormGroup;

    constructor(private createContractTemplateService: CreateContractTemplateService) {
    }

    ngOnInit() {
        const {form, contracts$} = this.createContractTemplateService;
        this.form = form;
        this.contracts$ = contracts$;
    }
}
