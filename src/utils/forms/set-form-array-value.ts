import { FormArray } from '@ngneat/reactive-forms';
import { AbstractControlOf } from '@ngneat/reactive-forms/lib/types';

export function replaceFormArrayValue<T, C extends AbstractControlOf<T>>(
    formArray: FormArray<C>,
    value: T[],
    createControl: (v: T) => C
): FormArray<C> {
    formArray.clear();
    if (Array.isArray(value)) {
        for (const item of value) {
            formArray.push(createControl(item) as any);
        }
    }
    return formArray;
}
