import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/utils';
import { merge, NEVER, ReplaySubject, Subject } from 'rxjs';
import { catchError, switchMap, pluck, shareReplay } from 'rxjs/operators';

import { FistfulStatisticsService } from '../../../../thrift-services/fistful/fistful-stat.service';

@Injectable()
export class ReceiveDepositService {
    private receiveDeposit$ = new ReplaySubject<string>();
    private error$ = new Subject<boolean>();

    // eslint-disable-next-line @typescript-eslint/member-ordering
    deposit$ = this.receiveDeposit$.pipe(
        switchMap((depositId) =>
            this.fistfulStatisticsService.getDeposits({ depositId } as any, null).pipe(
                catchError(() => {
                    this.error$.next(true);
                    return NEVER;
                })
            )
        ),
        pluck('result', 0),
        shareReplay(1)
    );

    // eslint-disable-next-line @typescript-eslint/member-ordering
    isLoading$ = progress(this.receiveDeposit$, merge(this.deposit$, this.error$));

    // eslint-disable-next-line @typescript-eslint/member-ordering
    hasError$ = this.error$.asObservable();

    constructor(private fistfulStatisticsService: FistfulStatisticsService) {}

    receiveDeposit(id: string) {
        this.receiveDeposit$.next(id);
    }
}
