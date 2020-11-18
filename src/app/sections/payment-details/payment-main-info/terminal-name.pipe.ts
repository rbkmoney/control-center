import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, pluck, switchMap, takeUntil } from 'rxjs/operators';

import { DomainTypedManager } from '../../../thrift-services/damsel';
import { TerminalID } from '../../../thrift-services/fistful/gen-model/fistful';

@Pipe({
    name: 'ccTerminalName',
    pure: false,
})
export class TerminalNamePipe implements PipeTransform, OnDestroy {
    private terminalName$ = new BehaviorSubject<string>('Loading...');
    private terminalIDChange$ = new Subject<TerminalID>();
    private destroy$ = new Subject<void>();

    constructor(private dtm: DomainTypedManager, private ref: ChangeDetectorRef) {
        this.terminalIDChange$
            .pipe(
                distinctUntilChanged(),
                takeUntil(this.destroy$),
                switchMap((id) => this.dtm.getTerminalObject(id)),
                pluck('data', 'name')
            )
            .subscribe((name) => {
                this.terminalName$.next(name);
                this.ref.markForCheck();
            });
    }

    transform(terminalID: TerminalID): string {
        this.terminalIDChange$.next(terminalID);
        return this.terminalName$.value;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
