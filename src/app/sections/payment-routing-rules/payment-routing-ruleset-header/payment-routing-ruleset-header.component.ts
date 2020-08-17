import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'cc-payment-routing-ruleset-header',
    templateUrl: 'payment-routing-ruleset-header.component.html',
    styleUrls: ['payment-routing-ruleset-header.component.scss'],
})
export class PaymentRoutingRulesetHeaderComponent {
    @Input() refID: string;
    @Input() description?: string;
    @Input() backTo?: string;

    @Output() add = new EventEmitter();

    constructor(private router: Router) {}

    navigateBack() {
        this.router.navigate([this.backTo]);
    }
}
