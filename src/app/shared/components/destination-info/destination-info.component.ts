import { Component, Input, OnInit } from '@angular/core';

import { ReceiveWalletService } from './receive-wallet/receive-wallet.service';

@Component({
    selector: 'cc-destination-info',
    templateUrl: 'destination-info.component.html',
    providers: [ReceiveWalletService],
})
export class DestinationInfoComponent implements OnInit {
    @Input()
    destinationID: string;

    @Input()
    identityID: string;

    wallet$ = this.receiveWalletService.wallet$;
    isLoading$ = this.receiveWalletService.isLoading$;
    hasError$ = this.receiveWalletService.hasError$;

    constructor(private receiveWalletService: ReceiveWalletService) {}

    ngOnInit() {
        this.receiveWalletService.receiveWallet({
            destinationID: this.destinationID,
            identityID: this.identityID,
        });
    }
}
