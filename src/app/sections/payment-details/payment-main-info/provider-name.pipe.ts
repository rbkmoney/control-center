import { ChangeDetectorRef, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { distinctUntilChanged, pluck, switchMap, takeUntil } from 'rxjs/operators';

import { DomainTypedManager } from '../../../thrift-services/damsel';
import { ProviderID } from '../../../thrift-services/fistful/gen-model/provider';

@Pipe({
    name: 'ccProviderName',
    pure: false,
})
export class ProviderNamePipe implements PipeTransform, OnDestroy {
    private providerName$ = new BehaviorSubject<string>('Loading...');
    private providerIDChange$ = new Subject<ProviderID>();
    private destroy$ = new Subject<void>();

    constructor(private dtm: DomainTypedManager, private ref: ChangeDetectorRef) {
        this.providerIDChange$
            .pipe(
                distinctUntilChanged(),
                takeUntil(this.destroy$),
                switchMap((id) => this.dtm.getProviderObject(id)),
                pluck('data', 'name')
            )
            .subscribe((name) => {
                this.providerName$.next(name);
                this.ref.markForCheck();
            });
    }

    transform(providerID: any): string {
        this.providerIDChange$.next(providerID);
        return this.providerName$.value;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
