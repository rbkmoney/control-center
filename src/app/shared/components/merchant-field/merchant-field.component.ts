import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import { coerceBoolean } from 'coerce-property';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import {
    catchError,
    debounceTime,
    map,
    startWith,
    switchMap,
    tap,
    withLatestFrom,
} from 'rxjs/operators';

import { Option } from '@cc/components/select-search-field';

import { DeanonimusService } from '../../../thrift-services/deanonimus';
import { Party } from '../../../thrift-services/deanonimus/gen-model/deanonimus';

@UntilDestroy()
@Component({
    selector: 'cc-merchant-field',
    templateUrl: 'merchant-field.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [provideValueAccessor(MerchantFieldComponent)],
})
export class MerchantFieldComponent extends FormControlSuperclass<Party> implements OnInit {
    @Input() label: string;
    @Input() @coerceBoolean required: boolean;

    formControl = new FormControl<Party>();
    incomingValue$ = new Subject<Partial<Party>>();
    options$ = new ReplaySubject<Option<Party>[]>(1);
    searchChange$ = new Subject<string>();

    constructor(
        injector: Injector,
        private deanonimusService: DeanonimusService,
        private snackBar: MatSnackBar
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.incomingValue$
            .pipe(
                withLatestFrom(this.options$.pipe(startWith<Option<Party>[]>([]))),
                switchMap(([value, options]) => {
                    if (!value?.id) return of<Party>(null);
                    const v = options.find((o) => o.value.id === value.id);
                    if (v) return of(v.value);
                    return this.searchOptions(value?.id).pipe(
                        tap((options) => this.options$.next(options)),
                        map(
                            (options) =>
                                options?.find((o) => o.value.id === this.formControl.value?.id)
                                    ?.value || null
                        )
                    );
                }),
                untilDestroyed(this)
            )
            .subscribe((v) => this.formControl.setValue(v));
        this.formControl.valueChanges.subscribe((v) => this.emitOutgoingValue(v));
        this.searchChange$
            .pipe(
                debounceTime(600),
                switchMap((str) => this.searchOptions(str)),
                untilDestroyed(this)
            )
            .subscribe((options) => this.options$.next(options));
    }

    handleIncomingValue(partyLike: Partial<Party>): void {
        this.formControl.setValue(partyLike as Party);
        this.incomingValue$.next(partyLike);
    }

    private searchOptions(str: string): Observable<Option<Party>[]> {
        return this.deanonimusService.searchParty(str).pipe(
            map((parties) => parties.map((p) => ({ label: p.party.email, value: p.party }))),
            catchError((err) => {
                this.snackBar.open('Search error', 'OK', { duration: 2000 });
                console.error(err);
                return of([]);
            })
        );
    }
}
