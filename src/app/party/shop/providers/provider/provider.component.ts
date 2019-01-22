import { Component, Input } from '@angular/core';

import { ProviderObject } from '../../../../damsel/domain';

@Component({
    selector: 'cc-provider',
    templateUrl: 'provider.component.html',
    styleUrls: ['provider.component.scss']
})
export class ProviderComponent {
    @Input() provider: ProviderObject;
}