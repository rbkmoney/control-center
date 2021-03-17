import { Injectable } from '@angular/core';
import { forkJoin, merge, NEVER, of, ReplaySubject } from 'rxjs';
import { pluck, shareReplay } from 'rxjs/operators';
import { catchError, map, switchMap } from 'rxjs/internal/operators';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';

import { FistfulStatisticsService } from '../../../../thrift-services/fistful/fistful-stat.service';
import { ReceiveWalletParams } from '../types/receive-wallet-params';

@Injectable()
export class ReceiveWalletService {
    private receiveWallet$ = new ReplaySubject<ReceiveWalletParams>();
    private error$ = new ReplaySubject<boolean>();

    wallet$ = this.receiveWallet$.pipe(
        switchMap(({ identityID, destinationID }) =>
            forkJoin([
                of(destinationID),
                this.fistfulStatisticsService.getWallets({ identity_id: identityID }).pipe(
                    catchError(() => {
                        this.error$.next(true);
                        return NEVER;
                    }),
                    pluck('data', 'wallets')
                ),
            ])
        ),
        map(([id, wallets]) => wallets.filter((wallet) => wallet.id === id)[0]),
        shareReplay(1)
    );

    isLoading$ = progress(this.receiveWallet$, merge(this.wallet$, this.error$));

    hasError$ = this.error$.asObservable();

    constructor(private fistfulStatisticsService: FistfulStatisticsService) {}

    receiveWallet(params: ReceiveWalletParams) {
        this.receiveWallet$.next(params);
    }
}
