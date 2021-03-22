import { Component, Input, OnInit } from '@angular/core';

import { ReceiveWalletService } from './services/receive-wallet/receive-wallet.service';

@Component({
    selector: 'cc-wallet-info',
    templateUrl: 'wallet-info.component.html',
    providers: [ReceiveWalletService],
})
export class WalletInfoComponent implements OnInit {
    @Input()
    walletID: string;

    wallet$ = this.receiveWalletService.wallet$;
    isLoading$ = this.receiveWalletService.isLoading$;
    hasError$ = this.receiveWalletService.hasError$;

    constructor(private receiveWalletService: ReceiveWalletService) {}

    ngOnInit() {
        this.receiveWalletService.receiveWallet(this.walletID);
    }
}
