import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { FetchProviderService } from './fetch-provider.service';

@Component({
    selector: 'cc-payment-provider',
    templateUrl: 'payment-provider.component.html',
    providers: [FetchProviderService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentProviderComponent implements OnInit {
    @Input()
    providerID: number;

    provider$ = this.fetchProviderService.provider$;
    inProgress$ = this.fetchProviderService.inProgress$;

    constructor(private fetchProviderService: FetchProviderService) {}

    ngOnInit() {
        this.fetchProviderService.getProvider(this.providerID);
    }
}
