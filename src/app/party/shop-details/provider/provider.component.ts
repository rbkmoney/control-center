import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProviderInfo } from '../shop-details.service';

@Component({
    selector: 'cc-provider',
    templateUrl: 'provider.component.html',
    styleUrls: ['provider.component.scss']
})
export class ProviderComponent {
    @Input() providerInfo: ProviderInfo[];
    @Input() partyID: string;
    @Input() shopID: string;
    @Output() terminalRemovedEvent: EventEmitter<void> = new EventEmitter();

    terminalRemoved() {
        this.terminalRemovedEvent.emit();
    }
}
