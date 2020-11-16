import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { ProviderInfo } from '../provider-info';

@Component({
    selector: 'cc-provider',
    templateUrl: 'provider.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProviderComponent {
    @Input()
    providerInfo: ProviderInfo;

    @Output()
    terminalChanged: EventEmitter<void> = new EventEmitter();
}
