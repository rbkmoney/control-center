import { AbstractControl as NgAbstractControl } from '@angular/forms';
import { AbstractControl } from '@ngneat/reactive-forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { getValue } from './get-value';

export function getFormValueChanges<T>(
    form: AbstractControl<T> | NgAbstractControl,
    hasStart = false
): Observable<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return form.valueChanges.pipe(
        ...((hasStart ? [startWith(form.value)] : []) as []),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        map(() => getValue(form))
    );
}
