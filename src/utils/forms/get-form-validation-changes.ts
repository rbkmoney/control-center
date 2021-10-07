import { AbstractControl } from '@ngneat/reactive-forms';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';

export function getFormValidationChanges<T>(form: AbstractControl<T>): Observable<boolean> {
    return form.statusChanges.pipe(
        startWith(form.status),
        map(() => form.valid),
        distinctUntilChanged()
    );
}
