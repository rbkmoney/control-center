import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TerminalOption } from '../../../claim/domain-typed-manager';

const toFormArray = (fb: FormBuilder, options: TerminalOption[]): FormArray =>
    fb.array(options.map(option => fb.group(option)));

@Injectable()
export class AddProviderService {
    providerForm: FormGroup;
    terminalForm: FormGroup;

    riskCoverages = [
        {
            name: 'low',
            value: 0
        },
        {
            name: 'high',
            value: 100
        },
        {
            name: 'fatal',
            value: 9999
        }
    ];

    constructor(private fb: FormBuilder) {
        this.providerForm = this.prepareProviderForm();
        this.terminalForm = this.prepareTerminalForm();
    }

    addOption() {
        (this.terminalForm.controls.options as FormArray).push(this.getOption());
    }

    removeOption(index: number) {
        const options = this.terminalForm.controls.options as FormArray;
        if (options.length > 1) {
            options.removeAt(index);
        }
    }

    private getOption(): FormGroup {
        return this.fb.group({
            key: '',
            value: ''
        });
    }

    private prepareProviderForm(): FormGroup {
        return this.fb.group({
            id: ['', Validators.required]
        });
    }

    private prepareTerminalForm(): FormGroup {
        return this.fb.group({
            terminalName: ['', Validators.required],
            terminalDescription: ['', Validators.required],
            riskCoverage: ['', Validators.required],
            options: toFormArray(this.fb, [{ key: '', value: '' }])
        });
    }
}
