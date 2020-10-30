import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppAuthGuardService, OperationRole } from '@cc/app/shared/services';
import { hasActiveFragments } from '@cc/utils/has-active-fragments';

@Component({
    templateUrl: 'operations.component.html',
    styleUrls: ['operations.component.scss'],
})
export class OperationsComponent {
    links = this.getLinks();

    constructor(private router: Router, private appAuthGuardService: AppAuthGuardService) {}

    private getLinks() {
        const links = [
            {
                name: 'Payments',
                url: 'payments',
                otherActiveUrlFragments: ['payment'],
                activateRoles: [OperationRole.SearchPayments],
            },
        ];
        return links.filter((item) => this.appAuthGuardService.userHasRoles(item.activateRoles));
    }

    hasActiveFragments(fragments: string[]): boolean {
        const ulrFragments = this.router.url.split('/');
        return hasActiveFragments(fragments, ulrFragments);
    }
}
