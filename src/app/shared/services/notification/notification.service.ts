import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

const DEFAULT_DURATION_MS = 3000;

@Injectable()
export class NotificationService {
    constructor(private snackBar: MatSnackBar) {}

    success(message: string = 'Success') {
        return this.snackBar.open(message, 'OK', {
            duration: DEFAULT_DURATION_MS,
        });
    }

    error(message: string = 'Error') {
        return this.snackBar.open(message, 'OK', {
            duration: DEFAULT_DURATION_MS,
        });
    }
}
