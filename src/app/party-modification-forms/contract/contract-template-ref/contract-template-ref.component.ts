import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import get from 'lodash-es/get';
import sortBy from 'lodash-es/sortBy';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/internal/operators';

import { ContractService } from '../../../papi/contract.service';
import { ContractTemplate } from '../../../papi/model';
import { ContractTemplateRef } from '../../../thrift-services/damsel/gen-model/domain';

@Component({
    selector: 'cc-contract-template-ref',
    templateUrl: 'contract-template-ref.component.html',
})
export class ContractTemplateRefComponent implements OnInit {
    @Input()
    form: FormGroup;

    @Input()
    required: boolean;

    @Input()
    initialValue: ContractTemplateRef;

    contracts$: Observable<ContractTemplate[]>;

    isLoading = true;

    constructor(
        private fb: FormBuilder,
        private contractService: ContractService,
        private snackBar: MatSnackBar
    ) {}

    ngOnInit() {
        const templateId = get(this, 'initialValue.id', '');
        this.form.registerControl(
            'id',
            this.fb.control(
                {
                    value: templateId,
                    disabled: templateId.length === 0,
                },
                this.required ? Validators.required : null
            )
        );
        this.form.updateValueAndValidity();
        this.contracts$ = this.contractService.getContractTemplates().pipe(
            map((contracts) => sortBy(contracts, 'id')),
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
