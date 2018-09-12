import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ContractTemplate } from '../../../papi/model';
import { map } from 'rxjs/operators';
import sortBy from 'lodash-es/sortBy';
import { ContractService } from '../../../papi/contract.service';

@Component({
    selector: 'cc-contract-template-ref',
    templateUrl: 'contract-template-ref.component.html'
})
export class ContractTemplateRefComponent implements OnInit {

    @Input()
    form: FormGroup;

    contracts$: Observable<ContractTemplate[]>;

    constructor(private fb: FormBuilder,
                private contractService: ContractService) {
    }

    ngOnInit() {
        this.form.addControl('id', this.fb.control('', Validators.required));
        this.contracts$ = this.contractService
            .getContractTemplates()
            .pipe(map((contracts) => sortBy(contracts, 'id')));
    }
}
