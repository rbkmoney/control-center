import { Injectable } from '@angular/core';
import { merge, NEVER, ReplaySubject } from 'rxjs';
import { catchError, switchMap, shareReplay } from 'rxjs/operators';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';

import { ManagementService } from '@cc/app/api/fistful';

import { WalletManagementService } from '../../../../../thrift-services/fistful/wallet-management.service';

@Injectable()
export class ReceiveWalletService {
    private receiveWallet$ = new ReplaySubject<string>();
    private error$ = new ReplaySubject<boolean>();

    // wallet$ = this.receiveWallet$.pipe(
    //     switchMap((id) =>
    //         this.walletManagementService.getWallet(id).pipe(
    //             catchError((e) => {
    //                 console.log(e);
    //                 this.error$.next(true);
    //                 return NEVER;
    //             })
    //         )
    //     ),
    //     shareReplay(1)
    // );

    wallet$ = this.receiveWallet$.pipe(
        switchMap((id) =>
            this.managementService.get(id).pipe(
                catchError((e) => {
                    console.error(e);
                    this.error$.next(true);
                    return NEVER;
                })
            )
        ),
        shareReplay(1)
    );

    isLoading$ = progress(this.receiveWallet$, merge(this.wallet$, this.error$));

    hasError$ = this.error$.asObservable();

    constructor(
        private walletManagementService: WalletManagementService,
        private managementService: ManagementService
    ) {}

    receiveWallet(id: string) {
        this.receiveWallet$.next(id);
    }
}
