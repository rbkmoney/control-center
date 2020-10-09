import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { hasActiveFragments } from '@cc/utils/index';

@Component({
    templateUrl: 'operations.component.html',
    styleUrls: ['operations.component.scss'],
})
export class OperationsComponent {
    links = [{ name: 'Payments', url: 'payments', otherActiveUrlFragments: ['payment'] }];

    constructor(private router: Router) {}

    hasActiveFragments(fragments: string[]): boolean {
        const ulrFragments = this.router.url.split('/');
        return hasActiveFragments(fragments, ulrFragments);
    }
}
