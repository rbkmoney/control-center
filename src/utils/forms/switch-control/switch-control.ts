import { AbstractControl } from '@angular/forms';

export function switchControl<T extends PropertyKey>(type: T, controls: [T, AbstractControl][]): void {
    for (const [controlType, control] of controls) {
        if (type === controlType) control.enable();
        else control.disable();
    }
}
