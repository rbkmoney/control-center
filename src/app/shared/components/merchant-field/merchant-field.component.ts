import { ChangeDetectionStrategy, Component, Injector, Input, OnInit } from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { FormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import { coerceBoolean } from 'coerce-property';
import { of, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, switchMap, tap, withLatestFrom } from 'rxjs/operators';

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

    constructor(injector: Injector, private deanonimusService: DeanonimusService) {
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
                    return this.deanonimusService.searchParty(value.id).pipe(
                        map((parties) =>
                            parties.map((p) => ({ label: p.party.email, value: p.party }))
                        ),
                        tap((options) => this.options$.next(options)),
                        map((options) => options.find((o) => o.value.id === value.id).value || null)
                    );
                })
            )
            .subscribe((v) => this.formControl.setValue(v));
        this.formControl.valueChanges.subscribe((v) => this.emitOutgoingValue(v));
    }

    searchChange(str: string): void {
        this.deanonimusService
            .searchParty(str)
            .pipe(map((parties) => parties.map((p) => ({ label: p.party.email, value: p.party }))))
            .subscribe((options) => this.options$.next(options));
    }

    handleIncomingValue(partyLike: Partial<Party>): void {
        this.formControl.setValue(partyLike as Party);
        this.incomingValue$.next(partyLike);
    }
}
