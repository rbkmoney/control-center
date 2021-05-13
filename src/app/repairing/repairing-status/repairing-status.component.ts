import { Component, Input } from '@angular/core';

export enum RepairingStatusType {
    /* eslint-disable @typescript-eslint/naming-convention */
    error = 'error',
    warn = 'warn',
    info = 'info',
    /* eslint-enable @typescript-eslint/naming-convention */
}

@Component({
    selector: 'cc-repairing-status',
    templateUrl: 'repairing-status.component.html',
    styleUrls: [],
    providers: [],
})
export class RepairingStatusComponent {
    @Input()
    status: string;
    @Input()
    description?: string;
    @Input()
    type: RepairingStatusType = RepairingStatusType.info;
    @Input()
    disabled?: boolean;

    getColor() {
        switch (this.type) {
            case RepairingStatusType.info:
                return 'primary';
            case RepairingStatusType.warn:
                return 'accent';
            default:
                return 'warn';
        }
    }
}
