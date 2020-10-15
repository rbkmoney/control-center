import { SimpleChange } from '@angular/core';

export interface ComponentChange<T, P extends keyof T>
    extends Omit<SimpleChange, 'previousValue' | 'currentValue'> {
    previousValue: T[P];
    currentValue: T[P];
}

export type ComponentChanges<T> = {
    [P in keyof T]?: ComponentChange<T, P>;
};
