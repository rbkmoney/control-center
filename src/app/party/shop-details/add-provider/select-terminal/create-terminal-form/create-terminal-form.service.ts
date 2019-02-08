import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DomainTypedManager, TerminalOption } from '../../../../../thrift';
import { Observable } from 'rxjs';

const toFormArray = (fb: FormBuilder, options: TerminalOption[]): FormArray =>
    fb.array(options.map(option => fb.group(option)));

@Injectable()
export class CreateTerminalFormService {
    form: FormGroup;

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

    constructor(private fb: FormBuilder, private dtm: DomainTypedManager) {
        this.form = this.prepareTerminalForm();
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

    saveTerminal(): Observable<number> {
        return this.dtm.createTerminal(this.form.value);
    }

    private getOption(): FormGroup {
        return this.fb.group({
            key: '',
            value: ''
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
