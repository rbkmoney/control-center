import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormGroup,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import identity from 'lodash-es/identity';
import pickBy from 'lodash-es/pickBy';
import { merge, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, map, shareReplay, startWith, tap } from 'rxjs/operators';

import { PaymentSystemObject } from '@cc/app/api/damsel/gen-model/domain';
import { ComponentChanges } from '@cc/app/shared/utils';

import { DomainCacheService } from '../../../../../thrift-services/damsel/domain-cache.service';
import {
    BankCardConditionDefinition,
    LegacyBankCardPaymentSystem,
    LegacyBankCardTokenProvider,
    Predicate,
    CountryCode,
    TokenizationMethod,
} from '../../../../../thrift-services/damsel/gen-model/domain';

/* eslint-disable @typescript-eslint/naming-convention */
enum PredicateType {
    constant = 'constant',
    condition = 'condition',
    anyOf = 'anyOf',
    allOf = 'allOf',
    isNot = 'isNot',
}

enum ConditionType {
    paymentTool = 'paymentTool',
}

enum PaymentToolType {
    bankCard = 'bankCard',
}

enum BankCardType {
    issuerCountryIs = 'issuerCountryIs',
    paymentSystem = 'paymentSystem',
    paymentSystemIs = 'paymentSystemIs',
}
/* eslint-enable @typescript-eslint/naming-convention */

@Component({
    selector: 'cc-predicate',
    templateUrl: 'predicate.component.html',
    styleUrls: ['predicate.component.scss'],
})
export class PredicateComponent implements OnChanges {
    @Input() form = this.createForm();
    @Output() validationChange = new EventEmitter<boolean>();
    @Output() predicateChange = new EventEmitter<Predicate>();

    predicateType = PredicateType;
    conditionType = ConditionType;
    paymentToolType = PaymentToolType;
    bankCardType = BankCardType;

    deprecatedPaymentSystems$: Observable<string[]>;
    paymentSystems$: Observable<PaymentSystemObject[]> = this.domainService.getObjects(
        'payment_system'
    );
    tokenProviders$: Observable<string[]>;
    tokenizationMethods$: Observable<string[]>;
    residences$: Observable<string[]>;

    private outputSub: Subscription;

    get childrenForm() {
        return this.form?.controls?.children as FormArray;
    }

    constructor(private fb: FormBuilder, private domainService: DomainCacheService) {
        this.init();
    }

    ngOnChanges({ form }: ComponentChanges<PredicateComponent>): void {
        if (form) {
            this.init(true);
        }
    }

    addChild() {
        this.childrenForm.push(this.createForm());
    }

    removeChild(idx: number) {
        this.childrenForm.removeAt(idx);
        if (!this.childrenForm.controls.length) {
            this.addChild();
        }
    }

    removeAll() {
        this.childrenForm.clear();
        this.addChild();
    }

    private init(isInternal = false) {
        if (this.childrenForm && !this.childrenForm.controls.length) {
            this.addChild();
        }
        const { condition, constant, type } = this.form.controls;
        type.valueChanges.pipe(startWith(type.value), distinctUntilChanged()).subscribe((t) => {
            switch (t) {
                case PredicateType.allOf:
                case PredicateType.anyOf:
                case PredicateType.isNot:
                    this.childrenForm.enable();
                    constant.disable();
                    condition.disable();
                    break;
                case PredicateType.constant:
                    this.childrenForm.disable();
                    constant.enable();
                    condition.disable();
                    break;
                case PredicateType.condition:
                    this.childrenForm.disable();
                    constant.disable();
                    condition.enable();
                    break;
                default:
                    this.childrenForm.disable();
                    constant.disable();
                    condition.disable();
                    break;
            }
        });
        const {
            residence,
            paymentSystemIs,
            paymentSystem,
            type: bankCardType,
            tokenProvider,
            tokenizationMethod,
        } = (this.form.get('condition.paymentTool.bankCard') as FormGroup).controls;
        bankCardType.valueChanges
            .pipe(startWith(bankCardType.value), distinctUntilChanged())
            .subscribe((t) => {
                switch (t) {
                    case BankCardType.issuerCountryIs:
                        paymentSystem.disable();
                        paymentSystemIs.disable();
                        residence.enable();
                        break;
                    case BankCardType.paymentSystem:
                        residence.disable();
                        paymentSystemIs.disable();
                        paymentSystem.enable();
                        break;
                    case BankCardType.paymentSystemIs:
                        residence.disable();
                        paymentSystem.disable();
                        paymentSystemIs.enable();
                        break;
                    default:
                        residence.disable();
                        paymentSystem.disable();
                        paymentSystemIs.disable();
                        break;
                }
            });
        if (this.outputSub) {
            this.outputSub.unsubscribe();
            delete this.outputSub;
        }
        if (!isInternal) {
            this.outputSub = merge(
                this.form.valueChanges.pipe(
                    startWith(this.form.value),
                    map(() => this.valueToPredicate()),
                    distinctUntilChanged(),
                    tap((v) => this.predicateChange.next(v))
                ),
                this.form.statusChanges.pipe(
                    startWith(this.form.status),
                    map(() => this.form.valid),
                    distinctUntilChanged(),
                    tap((s) => this.validationChange.next(s))
                )
            ).subscribe();
        }
        this.deprecatedPaymentSystems$ = this.getFilteredKeys(
            paymentSystemIs,
            LegacyBankCardPaymentSystem
        );
        this.tokenProviders$ = this.getFilteredKeys(tokenProvider, LegacyBankCardTokenProvider);
        this.tokenizationMethods$ = this.getFilteredKeys(tokenizationMethod, TokenizationMethod);
        this.residences$ = this.getFilteredKeys(residence, CountryCode);
    }

    private createForm() {
        return this.fb.group({
            type: ['', Validators.required],
            condition: this.fb.group({
                type: [ConditionType.paymentTool, Validators.required],
                paymentTool: this.fb.group({
                    type: [PaymentToolType.bankCard, Validators.required],
                    bankCard: this.fb.group({
                        type: ['', Validators.required],
                        residence: ['', [Validators.required, this.enumValidator(CountryCode)]],
                        paymentSystemIs: [
                            '',
                            [Validators.required, this.enumValidator(LegacyBankCardPaymentSystem)],
                        ],
                        paymentSystem: ['', [Validators.required]],
                        tokenProvider: ['', this.enumValidator(LegacyBankCardTokenProvider)],
                        tokenizationMethod: ['', this.enumValidator(TokenizationMethod)],
                    }),
                }),
            }),
            constant: ['', Validators.required],
            children: this.fb.array([]),
        });
    }

    private valueToPredicate(value = this.form.value): Predicate {
        if (this.form.invalid) {
            return null;
        }
        switch (value.type) {
            case PredicateType.allOf:
                return { all_of: value.children.map((c) => this.valueToPredicate(c)) };
            case PredicateType.anyOf:
                return { any_of: value.children.map((c) => this.valueToPredicate(c)) };
            case PredicateType.isNot:
                return { is_not: this.valueToPredicate(value.children[0]) };
            case PredicateType.constant:
                return { constant: value.constant };
            case PredicateType.condition:
                if (!value.condition) {
                    return null;
                }
                return {
                    condition: {
                        payment_tool: {
                            bank_card: {
                                definition: this.bankCardValueToBankCardConditionDefinition(
                                    value.condition.paymentTool.bankCard
                                ),
                            },
                        },
                    },
                };
        }
    }

    private bankCardValueToBankCardConditionDefinition(value: any): BankCardConditionDefinition {
        switch (value.type) {
            case BankCardType.issuerCountryIs:
                return { issuer_country_is: CountryCode[value.residence as string] };
            case BankCardType.paymentSystem:
                return {
                    payment_system: pickBy(
                        {
                            tokenization_method_is:
                                TokenizationMethod[value.tokenizationMethod as string],
                            payment_system_is: { id: value.paymentSystem },
                            token_provider_is_deprecated:
                                LegacyBankCardTokenProvider[value.tokenProvider as string],
                        },
                        identity
                    ),
                };
            case BankCardType.paymentSystemIs:
                return {
                    payment_system_is:
                        LegacyBankCardPaymentSystem[
                            value.paymentSystemIs as keyof LegacyBankCardPaymentSystem
                        ],
                };
        }
    }

    private getFilteredKeys(control: AbstractControl, enumObj: any) {
        return control.valueChanges.pipe(
            startWith(control.value),
            map((v) => v.trim().toLowerCase()),
            map((v) =>
                this.getKeys(enumObj).filter((option) => option.toLowerCase().indexOf(v) === 0)
            ),
            shareReplay(1)
        );
    }

    private getKeys(enumObj: any) {
        return Object.keys(enumObj).filter((k) => isNaN(+k));
    }

    private enumValidator(enumObj: any): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null =>
            !control.value || Object.keys(enumObj).includes(control.value)
                ? null
                : { enumNotIncludeKey: { value: control.value } };
    }
}
