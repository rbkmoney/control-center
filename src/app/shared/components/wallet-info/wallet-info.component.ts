import { Component, Input, OnInit } from '@angular/core';

import { ReceiveWalletService } from './receive-wallet/receive-wallet.service';

@Component({
    selector: 'cc-wallet-info',
    templateUrl: 'wallet-info.component.html',
    providers: [ReceiveWalletService],
})
export class WalletInfoComponent implements OnInit {
    @Input()
    walletID: string;

    @Input()
    identityID: string;

    wallet$ = this.receiveWalletService.wallet$;
    isLoading$ = this.receiveWalletService.isLoading$;
    hasError$ = this.receiveWalletService.hasError$;

    constructor(private receiveWalletService: ReceiveWalletService) {}

    ngOnInit() {
        this.receiveWalletService.receiveWallet({
            destinationID: this.walletID,
            identityID: this.identityID,
        });
    }
}
