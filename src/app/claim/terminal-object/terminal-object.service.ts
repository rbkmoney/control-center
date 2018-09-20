import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TerminalOption } from '../../domain/domain-typed-manager';
import { getOptions, prepareTerminalName } from './form-default-values';
import { DomainModificationInfo } from '../model';

const toFormArray = (fb: FormBuilder, options: TerminalOption[]): FormArray =>
    fb.array(options.map((option) => fb.group(option)));

@Injectable()
export class TerminalObjectService {

    optionTemplates: string[] = ['VTB', 'TCS', 'RIET', 'SNGB', 'none'];

    riskCoverages = [
        {
            name: 'low',
            value: 0
        }, {
            name: 'high',
            value: 100
        }, {
            name: 'fatal',
            value: 9999
        }
    ];

    form: FormGroup;

    private domainModificationInfo: DomainModificationInfo;

    constructor(private fb: FormBuilder) {
    }

    addOption() {
        (this.form.controls.options as FormArray).push(this.getOption());
    }

    removeOption(index: number) {
        const options = this.form.controls.options as FormArray;
        if (options.length > 1) {
            options.removeAt(index);
        }
    }

    initForm(info: DomainModificationInfo): FormGroup {
        this.domainModificationInfo = info;
        this.form = this.prepareForm(info);
        return this.form;
    }

    setBankOptionsTemplate(option: string) {
        this.form.setControl('options', toFormArray(this.fb, getOptions(option, this.domainModificationInfo)));
        this.form.patchValue({
            terminalName: prepareTerminalName(option, this.form.value.shopUrl)
        });
    }

    private prepareForm(param: DomainModificationInfo): FormGroup {
        const defaultOption = 'VTB';
        return this.fb.group({
            shopID: ['', Validators.required],
            partyID: [param.partyId, Validators.required],
            shopUrl: '',
            providerID: ['', Validators.required],
            terminalName: [prepareTerminalName(defaultOption, param.shopUrl), Validators.required],
            terminalDescription: 'No',
            riskCoverage: [100, Validators.required],
            bankOptionsTemplate: [defaultOption],
            options: toFormArray(this.fb, getOptions(defaultOption, param))
        });
    }

    private getOption(): FormGroup {
        return this.fb.group({
            key: '',
            value: ''
        });
    }
}
