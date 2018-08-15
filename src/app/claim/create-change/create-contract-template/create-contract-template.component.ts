import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import sortBy from 'lodash-es/sortBy';

import { CreateContractTemplateService } from './create-contract-template.service';
import { ContractTemplate } from '../../../papi/model';
import { ContractService } from '../../../papi/contract.service';

@Component({
    selector: 'cc-create-contract-template',
    templateUrl: 'create-contract-template.component.html'
})
export class CreateContractTemplateComponent implements OnInit {

    contracts$: Observable<ContractTemplate[]>;

    form: FormGroup;

    constructor(
        private createContractTemplateService: CreateContractTemplateService,
        private contractService: ContractService) {}

    ngOnInit() {
        this.form = this.createContractTemplateService.form;
        this.contracts$ = this.contractService
            .getContractTemplates()
            .pipe(map((contracts) => sortBy(contracts, 'id')));
    }
}
