import { InjectionToken } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

export const LAYOUT_GAP = new InjectionToken<string>('layoutGap');

export const SEARCH_LIMIT = new InjectionToken<number>('searchLimit');
export const DEFAULT_SEARCH_LIMIT = 10;

export type DialogConfig = {
    small: MatDialogConfig;
    medium: MatDialogConfig;
    large: MatDialogConfig;
};
export const DIALOG_CONFIG = new InjectionToken<DialogConfig>('dialogConfig');
const baseConfig: MatDialogConfig = {
    maxHeight: '90vh',
    disableClose: true,
    autoFocus: false,
};
export const DEFAULT_DIALOG_CONFIG: DialogConfig = {
    small: { ...baseConfig, width: '360px' },
    medium: { ...baseConfig, width: '552px' },
    large: { ...baseConfig, width: '648px' },
};
