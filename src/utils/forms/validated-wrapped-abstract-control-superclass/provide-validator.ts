import { ComponentType } from '@angular/cdk/overlay';
import { Provider } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

export const provideValidator = (component: ComponentType<unknown>): Provider => ({
    provide: NG_VALIDATORS,
    useExisting: component,
    multi: true,
});
