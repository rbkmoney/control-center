import { InjectionToken } from '@angular/core';

export interface SelectSearchFieldOptions {
    svgIcon?: string;
}

export const SELECT_SEARCH_FIELD_OPTIONS: InjectionToken<SelectSearchFieldOptions> = new InjectionToken(
    'SelectSearchFieldOptions'
);
