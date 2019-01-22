import { Component, Input } from '@angular/core';
import { ProviderObject } from '../../../damsel/domain';

@Component({
    selector: 'cc-providers',
    templateUrl: 'providers.component.html',
    styleUrls: ['providers.component.scss']
})
export class ProvidersComponent {
    @Input() providers: ProviderObject[];
}
