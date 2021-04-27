import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
    AfterViewInit,
    Directive,
    DoCheck,
    ElementRef,
    HostBinding,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Self,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    FormGroupDirective,
    NgControl,
    NgForm,
} from '@angular/forms';
import { MatAutocompleteOrigin } from '@angular/material/autocomplete';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import * as uuid from 'uuid';

import { InputMixinBase } from './input-base';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'cc-custom-form-control' })
/* eslint-disable @angular-eslint/no-conflicting-lifecycle */
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class CustomFormControl<I extends any = any, P extends any = I> extends InputMixinBase
    implements
        AfterViewInit,
        ControlValueAccessor,
        MatFormFieldControl<I>,
        OnDestroy,
        DoCheck,
        OnChanges {
    /** The aria-describedby attribute on the input for improved a11y. */
    @HostBinding('attr.aria-describedby') _ariaDescribedby: string;

    readonly stateChanges: Subject<void> = new Subject<void>();

    controlType = 'text';

    autofilled = false;

    formControl = new FormControl();
    autocompleteOrigin: MatAutocompleteOrigin;
    monitorsRegistered = false;

    protected _disabled = false;
    @Input()
    get disabled(): boolean {
        if (this.ngControl && this.ngControl.disabled !== null) {
            return this.ngControl.disabled;
        }
        return this._disabled;
    }
    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);

        // Browsers may not fire the blur event if the input is disabled too quickly.
        // Reset from here to ensure that the element doesn't become stuck.
        if (this.focused) {
            this.focused = false;
            this.stateChanges.next();
        }
    }

    protected _id: string;
    @HostBinding('attr.id')
    @Input()
    get id(): string {
        return this._id;
    }
    set id(value: string) {
        this._id = value || `custom-input-${uuid()}`;
    }

    @Input()
    placeholder: string;

    protected _required = false;
    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: boolean) {
        this._required = coerceBooleanProperty(value);
    }

    protected type = 'text';

    @Input()
    get value() {
        return this.formControl.value;
    }
    set value(value: I) {
        this.formControl.setValue(value);
        this.stateChanges.next();
    }

    get publicValue() {
        return this.toPublicValue(this.value);
    }
    set publicValue(value: P) {
        this.value = this.toInternalValue(value);
    }

    get details() {
        return this.getDetails(this.publicValue);
    }

    @HostBinding('class.floating')
    get shouldLabelFloat(): boolean {
        return this.focused || !this.empty;
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    inputRef = new ElementRef<HTMLInputElement>(null);

    get empty(): boolean {
        return !this.formControl.value;
    }

    private _focused = false;
    get focused(): boolean {
        return this._focused;
    }
    set focused(value: boolean) {
        this._focused = value;
        this.stateChanges.next();
    }

    constructor(
        private focusMonitor: FocusMonitor,
        private elementRef: ElementRef<HTMLElement>,
        private platform: Platform,
        @Optional() @Self() public ngControl: NgControl,
        private autofillMonitor: AutofillMonitor,
        defaultErrorStateMatcher: ErrorStateMatcher,
        @Optional() parentForm: NgForm,
        @Optional() parentFormGroup: FormGroupDirective
    ) {
        super(defaultErrorStateMatcher, parentForm, parentFormGroup, ngControl);
        if (this.ngControl !== null) {
            // Set the value accessor directly
            // (instead of providing NG_VALUE_ACCESSOR)
            // to avoid running into a circular import
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnChanges() {
        this.stateChanges.next();
    }

    ngDoCheck() {
        if (
            this.ngControl &&
            // TODO: dirty checking is temporary
            this.ngControl.dirty
        ) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    ngAfterViewInit(): void {
        this.setInputElement();
    }

    ngOnDestroy() {
        this.stateChanges.complete();

        if (this.platform.isBrowser) {
            this.autofillMonitor.stopMonitoring(this.inputRef);
        }
    }

    onContainerClick(event: MouseEvent): void {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this.focusMonitor.focusVia(this.inputRef, 'mouse');
        }
    }

    @HostListener('focusout')
    onTouched(): void {
        this._onTouched();
    }

    registerOnChange(onChange: (value: P) => void): void {
        // TODO: иногда передаются public value в toPublicValue и возникают ошибки
        this.formControl.valueChanges.subscribe((v) => onChange(this.toPublicValue(v)));
    }

    registerOnTouched(onTouched: () => void): void {
        this._onTouched = onTouched;
        this._onTouched();
    }

    setDescribedByIds(ids: string[]): void {
        this._ariaDescribedby = ids.join(' ');
    }

    setDisabledState(shouldDisable: boolean): void {
        if (shouldDisable) {
            this.formControl.disable();
        } else {
            this.formControl.enable();
        }

        this.disabled = shouldDisable;
    }

    setInputElement(
        input: HTMLInputElement = this.elementRef.nativeElement.querySelector('input')
    ) {
        this.inputRef.nativeElement = input;
        this.registerMonitors();
    }

    writeValue(value: P): void {
        this.formControl.setValue(this.toInternalValue(value), { emitEvent: false });
    }

    protected getDetails(value: P): string {
        return value as any;
    }

    protected toInternalValue(value: P): I {
        return value as any;
    }

    protected toPublicValue(value: I): P {
        return value as any;
    }

    private _onTouched = () => null;

    private registerMonitors() {
        if (!this.monitorsRegistered && this.inputRef.nativeElement) {
            this.monitorsRegistered = true;
            if (this.platform.isBrowser) {
                this.autofillMonitor.monitor(this.inputRef).subscribe((event) => {
                    this.autofilled = event.isAutofilled;
                    this.stateChanges.next();
                });
            }
            this.focusMonitor
                .monitor(this.elementRef.nativeElement, true)
                .subscribe((focusOrigin) => {
                    this.focused = !!focusOrigin;
                });
        }
    }
}
