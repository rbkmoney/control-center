import {
    ChangeDetectionStrategy,
    Component,
    Inject,
    Injector,
    Input,
    OnChanges,
    Optional,
    Output,
    EventEmitter,
    OnInit,
} from '@angular/core';
import { FormControl } from '@ngneat/reactive-forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControlSuperclass, provideValueAccessor } from '@s-libs/ng-core';
import { coerceBoolean } from 'coerce-property';
import { BehaviorSubject, combineLatest, defer, Observable, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { ComponentChanges } from '@cc/app/shared/utils';
import { getFormValueChanges } from '@cc/utils/forms';

import { SelectSearchFieldOptions, SELECT_SEARCH_FIELD_OPTIONS } from './tokens';
import { Option } from './types';
import { filterOptions } from './utils';

@UntilDestroy()
@Component({
    selector: 'cc-select-search-field',
    templateUrl: 'select-search-field.component.html',
    styleUrls: ['select-search-field.component.scss'],
    providers: [provideValueAccessor(SelectSearchFieldComponent)],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSearchFieldComponent<Value> extends FormControlSuperclass<Value>
    implements OnInit, OnChanges {
    @Input() label: string;
    @Input() @coerceBoolean required = false;
    @Input() options: Option<Value>[];
    @Input() svgIcon: string | null = this.fieldOptions?.svgIcon;
    @Input() hint: string | null;
    @Input() @coerceBoolean isExternalSearch: boolean = false;

    @Output() searchChange = new EventEmitter<string>();

    selectSearchControl = new FormControl<string>('');
    filteredOptions$: Observable<Option<Value>[]> = combineLatest(
        getFormValueChanges(this.selectSearchControl),
        defer(() => this.options$)
    ).pipe(map(([value, options]) => filterOptions(options, value)));
    selected$ = new ReplaySubject<Value>(1);

    private options$ = new BehaviorSubject<Option<Value>[]>([]);

    constructor(
        injector: Injector,
        @Optional()
        @Inject(SELECT_SEARCH_FIELD_OPTIONS)
        private fieldOptions: SelectSearchFieldOptions
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.selectSearchControl.valueChanges
            .pipe(filter<string>(Boolean), untilDestroyed(this))
            .subscribe((v) => this.searchChange.emit(v));
    }

    handleIncomingValue(value: Value): void {
        this.select(value);
    }

    ngOnChanges({ options }: ComponentChanges<SelectSearchFieldComponent<Value>>): void {
        if (options) this.options$.next(options.currentValue);
    }

    clear(event: MouseEvent): void {
        this.select(null);
        event.stopPropagation();
    }

    select(value: Value): void {
        this.selected$.next(value);
        this.emitOutgoingValue(value);
    }
}
