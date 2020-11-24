import { Injectable } from '@angular/core';
import { progress } from '@rbkmoney/partial-fetcher/dist/progress';
import { merge, Observable, of, Subject } from 'rxjs';
import { catchError, filter, shareReplay, startWith, switchMap } from 'rxjs/operators';

import { DomainTypedManager } from '../../../../thrift-services/damsel';
import { TerminalObject } from '../../../../thrift-services/damsel/gen-model/domain';
import { TerminalID } from '../../../../thrift-services/fistful/gen-model/fistful';

@Injectable()
export class FetchTerminalService {
    private getTerminal$ = new Subject<TerminalID>();
    private hasError$ = new Subject();

    terminal$: Observable<string | TerminalObject> = this.getTerminal$.pipe(
        switchMap((terminalID) =>
            this.dtm.getTerminalObject(terminalID).pipe(
                catchError(() => {
                    this.hasError$.next();
                    return of('error');
                }),
                filter((result) => result !== 'error')
            )
        ),
        shareReplay(1)
    );

    inProgress$ = progress(this.getTerminal$, merge(this.terminal$, this.hasError$)).pipe(
        startWith(true)
    );

    constructor(private dtm: DomainTypedManager) {
        this.terminal$.subscribe();
    }

    getTerminal(terminalID: number) {
        this.getTerminal$.next(terminalID);
    }
}
