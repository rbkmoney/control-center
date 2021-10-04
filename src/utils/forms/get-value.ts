import { AbstractControl } from '@angular/forms';
import { FormGroup, FormArray } from '@ngneat/reactive-forms';
import { ControlsValue } from '@ngneat/reactive-forms/lib/types';

function hasControls<T>(control: AbstractControl): control is FormGroup<T> | FormArray<T> {
    return !!(control as any)?.controls;
}

export function getValue<T extends AbstractControl>(control: T): T['value'] {
    if (!hasControls(control)) {
        return control.value;
    }
    if (Array.isArray(control.controls)) {
        const result: ControlsValue<T>[] = [];
        for (const v of control.controls) {
            result.push(getValue(v as any));
        }
        return result;
    }
    const result: Partial<ControlsValue<T>> = {};
    for (const [k, v] of Object.entries(control.controls)) {
        result[k] = getValue(v as any);
    }
    return result;
}
