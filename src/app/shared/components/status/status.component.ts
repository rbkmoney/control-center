import { Component, HostBinding, Input } from '@angular/core';

import { StatusColor } from './types/status-color';

@Component({
    selector: 'cc-status',
    templateUrl: 'status.component.html',
})
export class StatusComponent {
    @Input()
    color: StatusColor;

    @HostBinding('class.cc-status') baseClass = true;

    @HostBinding('class.cc-status-success')
    get success() {
        return this.color === StatusColor.Success;
    }

    @HostBinding('class.cc-status-pending')
    get pending() {
        return this.color === StatusColor.Pending;
    }

    @HostBinding('class.cc-status-warn')
    get warn() {
        return this.color === StatusColor.Warn;
    }
}
