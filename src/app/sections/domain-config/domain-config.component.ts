import { Component } from '@angular/core';

import { DomainConfigRole } from '@cc/app/shared/services';

@Component({
    templateUrl: 'domain-config.component.html',
    styleUrls: ['domain-config.component.scss'],
})
export class DomainConfigComponent {
    links = [
        {
            name: 'Domain Objects',
            url: 'objects',
            activateRoles: [DomainConfigRole.Checkout],
        },
    ];
}
