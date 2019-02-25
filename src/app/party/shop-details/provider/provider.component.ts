import { Component, Input } from '@angular/core';

import { ProviderInfo } from '../shop-details.service';

@Component({
    selector: 'cc-provider',
    templateUrl: 'provider.component.html',
    styleUrls: ['provider.component.scss']
})
export class ProviderComponent {
    @Input() providerInfo: ProviderInfo[];

    toString(kek: any) {
        return JSON.stringify(kek)
    }
}
