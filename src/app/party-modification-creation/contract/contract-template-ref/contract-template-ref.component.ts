import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/internal/operators';
import sortBy from 'lodash-es/sortBy';

import { ContractTemplate } from '../../../papi/model';
import { ContractService } from '../../../papi/contract.service';

@Component({
    selector: 'cc-contract-template-ref',
    templateUrl: 'contract-template-ref.component.html'
})
export class ContractTemplateRefComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    required: boolean;

    contracts$: Observable<ContractTemplate[]>;

    isLoading = true;

    constructor(
        private fb: FormBuilder,
        private contractService: ContractService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        this.form.registerControl(
            'id',
            this.fb.control(
                {
                    value: '',
                    disabled: true
                },
                this.required ? Validators.required : null
            )
        );
        this.contracts$ = this.contractService.getContractTemplates().pipe(
            map(contracts => sortBy(contracts, 'id')),
            tap(
                () => {
                    this.form.controls.id.enable();
                    this.isLoading = false;
                },
                () => {
                    this.isLoading = false;
                    this.snackBar.open('An error occurred while contract template receiving', 'OK');
                }
            )
        );
    }
}
