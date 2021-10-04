import { ComponentType } from '@angular/cdk/overlay';
import { Provider } from '@angular/core';
import { provideValueAccessor } from '@s-libs/ng-core';

import { provideValidator } from './provide-validator';

export const createValidatedAbstractControlProviders = (component: ComponentType<unknown>): Provider[] => [
    provideValueAccessor(component),
    provideValidator(component),
];
