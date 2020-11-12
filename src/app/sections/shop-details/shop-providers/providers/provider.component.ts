import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { ProviderInfo } from '../provider-info';

@Component({
    selector: 'cc-provider',
    templateUrl: 'provider.component.html'
})
export class ProviderComponent implements OnChanges {
    @Input()
    providerInfo: ProviderInfo;

    @Output()
    terminalChanged: EventEmitter<void> = new EventEmitter();

    ngOnChanges(changes: SimpleChanges) {
        console.log(this.providerInfo);
    }
}
