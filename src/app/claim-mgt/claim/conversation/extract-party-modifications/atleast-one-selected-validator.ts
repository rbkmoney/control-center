import { FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export const atLeastOneSelectedValidator: ValidatorFn = (
    arr: FormArray
): ValidationErrors | null => {
    return arr.controls.map((c) => c.value).includes(true)
        ? null
        : { error: 'You need to select at least one modification' };
};
