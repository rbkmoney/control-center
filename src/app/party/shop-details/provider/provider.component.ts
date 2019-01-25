import { Component, Input } from '@angular/core';

import { ProviderInfo } from '../shop-details.service';

@Component({
    selector: 'cc-provider',
    templateUrl: 'provider.component.html'
})
export class ProviderComponent {
    @Input() providerInfo: ProviderInfo[];
}
